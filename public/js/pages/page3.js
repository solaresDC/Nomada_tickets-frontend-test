/**
 * Page 3 (page3.html) JavaScript
 * Payment page with Stripe integration
 */

import { initHeader, getCurrentLanguage } from '../components/header.js';
import { openModal, closeModal } from '../components/modal.js';
import { showButtonLoading, hideButtonLoading } from '../components/loading-indicator.js';
import { getElementById, on, setText, addClass, removeClass, scrollTo } from '../utils/dom.js';
import { getTicketQuantities, clearTicketQuantities } from '../utils/storage.js';
import { isValidEmail } from '../utils/validation.js';
import { t } from '../i18n/translations.js';
import { CONFIG } from '../config/index.js';
import { createPaymentIntent, pollForQRCode, pollForTickets } from '../services/api-client.js';
import { 
  createElements, 
  mountPaymentElement, 
  confirmPayment, 
  getPaymentIntentId,
  cleanup as cleanupStripe 
} from '../services/stripe.js';
import { initCarousel, updateCarouselLanguage } from '../components/carousel.js';

// Page state
let stripe = null;
let elements = null;
let paymentElement = null;
let clientSecret = null;
let paymentIntentId = null;
let femaleQty = 0;
let maleQty = 0;

// Store tickets data for language switching
let currentTickets = [];

/**
 * Initialize Page 3
 */
export async function initPage3() {
  console.log('[Page3] Initializing...');
  
  // Initialize header with language change callback
  const currentLang = initHeader(onLanguageChange);
  
  // Load ticket quantities from localStorage
  const quantities = getTicketQuantities();
  femaleQty = quantities.femaleQty;
  maleQty = quantities.maleQty;
  
  console.log('[Page3] Loaded quantities:', { femaleQty, maleQty });
  
  // Validate quantities - redirect if none selected
  if (femaleQty === 0 && maleQty === 0) {
    console.warn('[Page3] No tickets selected, redirecting to page 2');
    window.location.href = 'page2.html';
    return;
  }
  
  // Apply translations
  applyTranslations(currentLang);
  
  // Set up event listeners
  setupEventListeners();
  
  // Initialize payment (no email at this point — user hasn't typed it yet)
  await initializePayment(currentLang);
  
  console.log('[Page3] Initialized');
}

/**
 * Handle language change
 * @param {string} lang - New language code
 */
async function onLanguageChange(lang) {
  console.log('[Page3] Language changed to:', lang);
  applyTranslations(lang);
  
  // Stripe Elements don't support locale change — must destroy and recreate
  if (clientSecret) {
    const stripeContainer = getElementById('Page3_StripePaymentElementMount');
    const payBtn = getElementById('Page3_PayButton');
    
    // Destroy current element
    if (paymentElement) {
      paymentElement.unmount();
      paymentElement = null;
    }
    
    // Show loading
    if (stripeContainer) {
      stripeContainer.innerHTML = '<div class="stripe-loading"><div class="stripe-loading-spinner"></div></div>';
    }
    if (payBtn) payBtn.disabled = true;
    
    // Recreate with new locale (reuses existing clientSecret — no new API call)
    const stripeResult = await createElements(clientSecret, lang);
    stripe = stripeResult.stripe;
    elements = stripeResult.elements;
    
    if (stripeContainer) stripeContainer.innerHTML = '';
    
    paymentElement = mountPaymentElement(elements, 'Page3_StripePaymentElementMount');
    paymentElement.on('ready', () => {
      if (payBtn) payBtn.disabled = false;
    });
  }

  // Update carousel language if tickets are displayed
  if (currentTickets.length > 0) {
    updateCarouselLanguage(lang, currentTickets);
    
    // Also update the success message
    const successMsg = getElementById('Page3_SuccessMessage');
    if (successMsg) {
      setText(successMsg, t(lang, 'tickets.showAtEntrance'));
    }
  }
}

/**
 * Apply translations to page elements
 * @param {string} lang - Language code
 */
function applyTranslations(lang) {
  // Page title
  const titleEl = getElementById('Page3_TitleText');
  if (titleEl) {
    setText(titleEl, t(lang, 'payment.title'));
  }
  
  // Back link
  const backLink = getElementById('backLink');
  if (backLink) {
    setText(backLink, t(lang, 'payment.backLink'));
  }
  
  // Order summary
  const summaryTitle = getElementById('orderSummaryTitle');
  if (summaryTitle) {
    setText(summaryTitle, t(lang, 'payment.orderSummary'));
  }
  
  const femaleTicketsLabel = getElementById('femaleTicketsLabel');
  if (femaleTicketsLabel) {
    setText(femaleTicketsLabel, t(lang, 'payment.femaleTickets'));
  }
  
  const maleTicketsLabel = getElementById('maleTicketsLabel');
  if (maleTicketsLabel) {
    setText(maleTicketsLabel, t(lang, 'payment.maleTickets'));
  }
  
  const subtotalLabel = getElementById('subtotalLabel');
  if (subtotalLabel) {
    setText(subtotalLabel, t(lang, 'payment.subtotal'));
  }
  
  const feeLabel = getElementById('feeLabel');
  if (feeLabel) {
    setText(feeLabel, t(lang, 'payment.processingFee'));
  }
  
  const totalLabel = getElementById('totalLabel');
  if (totalLabel) {
    setText(totalLabel, t(lang, 'payment.total'));
  }
  
  // Terms
  const termsTextEl = getElementById('Page3_TermsText');
  if (termsTextEl) {
    termsTextEl.innerHTML = `${t(lang, 'payment.termsText')} <a href="#" onclick="return false;">${t(lang, 'payment.termsLink')}</a>`;
  }
  
  const termsWarning = getElementById('Page3_TermsWarningText');
  if (termsWarning) {
    setText(termsWarning, t(lang, 'payment.termsWarning'));
  }
  
  // Pay button — always update text regardless of disabled state.
  // The button starts disabled while Stripe loads, but we still
  // want the correct language on it from the beginning.
  const payBtn = getElementById('Page3_PayButton');
  if (payBtn) {
    setText(payBtn, t(lang, 'payment.payBtn'));
  }
  
  // Secure badge
  const secureBadge = getElementById('secureBadgeText');
  if (secureBadge) {
    setText(secureBadge, t(lang, 'payment.secureBadge'));
  }
  
  // Processing modal
  const processingTitle = getElementById('processingTitle');
  if (processingTitle) {
    setText(processingTitle, t(lang, 'payment.processingTitle'));
  }
  
  const processingText = getElementById('processingText');
  if (processingText) {
    setText(processingText, t(lang, 'payment.processingText'));
  }
  
  // Success modal
  const successTitle = getElementById('successTitle');
  if (successTitle) {
    setText(successTitle, t(lang, 'payment.successTitle'));
  }
  
  const successMessage = getElementById('Page3_SuccessMessage');
  if (successMessage) {
    setText(successMessage, t(lang, 'payment.successMessage'));
  }
  
  const successContinueBtn = getElementById('Page3_SuccessContinueButton');
  if (successContinueBtn) {
    setText(successContinueBtn, t(lang, 'payment.successContinueBtn'));
  }
  
  const qrCaption = getElementById('qrCaption');
  if (qrCaption) {
    setText(qrCaption, t(lang, 'payment.qrCaption'));
  }

  // Email section
  const emailLabel = getElementById('Page3_EmailLabel');
  if (emailLabel) setText(emailLabel, t(lang, 'payment.emailLabel'));
  
  const emailInput = getElementById('Page3_EmailInput');
  if (emailInput) emailInput.placeholder = t(lang, 'payment.emailPlaceholder');
  
  const emailHelper = getElementById('Page3_EmailHelper');
  if (emailHelper) setText(emailHelper, t(lang, 'payment.emailHelper'));

  // Footer
  const copyright = getElementById('footerCopyright');
  if (copyright) {
    setText(copyright, t(lang, 'footer.copyright'));
  }
}

/**
 * Update order summary with quantities and pricing
 * @param {Object} pricing - Pricing from backend
 */
function updateOrderSummary(pricing) {
  // Quantities
  const femaleQtyEl = getElementById('femaleQtyDisplay');
  if (femaleQtyEl) {
    setText(femaleQtyEl, `${femaleQty} × $${CONFIG.PRICING.FEMALE_TICKET.toFixed(2)}`);
  }
  
  const femaleSubtotalEl = getElementById('femaleSubtotal');
  if (femaleSubtotalEl) {
    setText(femaleSubtotalEl, `$${(femaleQty * CONFIG.PRICING.FEMALE_TICKET).toFixed(2)}`);
  }
  
  const maleQtyEl = getElementById('maleQtyDisplay');
  if (maleQtyEl) {
    setText(maleQtyEl, `${maleQty} × $${CONFIG.PRICING.MALE_TICKET.toFixed(2)}`);
  }
  
  const maleSubtotalEl = getElementById('maleSubtotal');
  if (maleSubtotalEl) {
    setText(maleSubtotalEl, `$${(maleQty * CONFIG.PRICING.MALE_TICKET).toFixed(2)}`);
  }
  
  // Pricing from backend
  const subtotalEl = getElementById('subtotalAmount');
  if (subtotalEl) {
    setText(subtotalEl, `$${pricing.subtotal.toFixed(2)}`);
  }
  
  const feeEl = getElementById('feeAmount');
  if (feeEl) {
    setText(feeEl, `$${pricing.fee.toFixed(2)}`);
  }
  
  const totalEl = getElementById('totalAmount');
  if (totalEl) {
    setText(totalEl, `$${pricing.total.toFixed(2)} ${CONFIG.PRICING.CURRENCY}`);
  }
  
  // Hide rows with zero quantity
  const femaleRow = getElementById('femaleTicketsRow');
  const maleRow = getElementById('maleTicketsRow');
  
  if (femaleRow) {
    femaleRow.style.display = femaleQty > 0 ? 'flex' : 'none';
  }
  if (maleRow) {
    maleRow.style.display = maleQty > 0 ? 'flex' : 'none';
  }
}

/**
 * Initialize payment - create PaymentIntent and mount Stripe Elements.
 * Email is NOT passed here — the user hasn't typed it yet at page load.
 * Email is written to the PaymentIntent in handlePayment() right before confirmation.
 * @param {string} lang - Current language
 */
async function initializePayment(lang) {
  const stripeContainer = getElementById('Page3_StripePaymentElementMount');
  const payBtn = getElementById('Page3_PayButton');
  
  try {
    // Show loading state
    if (stripeContainer) {
      stripeContainer.innerHTML = '<div class="stripe-loading"><div class="stripe-loading-spinner"></div></div>';
    }
    if (payBtn) {
      payBtn.disabled = true;
    }
    
    // Create payment intent (no email yet — user hasn't typed it)
    console.log('[Page3] Creating payment intent...');
    const response = await createPaymentIntent(femaleQty, maleQty, lang);
    
    clientSecret = response.clientSecret;
    paymentIntentId = response.paymentIntentId;
    
    console.log('[Page3] Payment intent created:', paymentIntentId);
    
    // Update order summary with pricing from backend
    updateOrderSummary(response.pricing);
    
    // Initialize Stripe Elements
    console.log('[Page3] Initializing Stripe Elements...');
    const stripeResult = await createElements(clientSecret, lang);
    stripe = stripeResult.stripe;
    elements = stripeResult.elements;
    
    // Clear loading state
    if (stripeContainer) {
      stripeContainer.innerHTML = '';
    }
    
    // Mount Payment Element
    paymentElement = mountPaymentElement(elements, 'Page3_StripePaymentElementMount');
    
    // Enable pay button when Element is ready
    paymentElement.on('ready', () => {
      console.log('[Page3] Payment Element ready');
      if (payBtn) {
        payBtn.disabled = false;
      }
    });
    
    // Handle Element errors
    paymentElement.on('change', (event) => {
      if (event.error) {
        showPaymentError(event.error.message);
      } else {
        hidePaymentError();
      }
    });
    
  } catch (error) {
    console.error('[Page3] Failed to initialize payment:', error);
    showPaymentError(t(lang, 'payment.errorGeneric'));
    
    if (stripeContainer) {
      stripeContainer.innerHTML = `<p class="error-text visible">${t(lang, 'payment.errorNetwork')}</p>`;
    }
  }
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
  // Back link
  const backLink = getElementById('backLink');
  if (backLink) {
    on(backLink, 'click', (e) => {
      e.preventDefault();
      window.location.href = 'page2.html';
    });
  }
  
  // Terms checkbox
  const termsCheckbox = getElementById('Page3_TermsCheckbox');
  if (termsCheckbox) {
    on(termsCheckbox, 'change', () => {
      hideTermsWarning();
    });
  }
  
  // Pay button
  const payBtn = getElementById('Page3_PayButton');
  if (payBtn) {
    on(payBtn, 'click', handlePayment);
  }
  
  // Success continue button
  const successContinueBtn = getElementById('Page3_SuccessContinueButton');
  if (successContinueBtn) {
    on(successContinueBtn, 'click', () => {
      // Clear ticket quantities
      clearTicketQuantities();
      // Navigate to home
      window.location.href = 'index.html';
    });
  }
}

/**
 * Handle payment submission
 */
async function handlePayment() {
  const lang = getCurrentLanguage();
  const termsCheckbox = getElementById('Page3_TermsCheckbox');
  const payBtn = getElementById('Page3_PayButton');
  
  // Validate terms accepted
  if (!termsCheckbox || !termsCheckbox.checked) {
    showTermsWarning();
    scrollTo(getElementById('Page3_TermsSection'));
    return;
  }
  
  // Read email NOW — at the moment the user clicks Pay
  const emailInput = getElementById('Page3_EmailInput');
  const emailValue = emailInput ? emailInput.value.trim() : '';
  const emailError = getElementById('Page3_EmailError');
  
  if (emailValue && !isValidEmail(emailValue)) {
    // Email was entered but is invalid — stop and show error
    if (emailError) emailError.style.display = 'block';
    if (emailInput) emailInput.focus();
    return;
  } else {
    if (emailError) emailError.style.display = 'none';
  }

  // Hide any previous errors
  hidePaymentError();
  hideTermsWarning();

  // Write the email into the PaymentIntent metadata before confirming.
  // This is the correct moment — the user has finished typing.
  if (emailValue && paymentIntentId) {
    try {
      console.log('[Page3] Updating email on PaymentIntent...');
      await fetch(`${CONFIG.BACKEND_URL}/api/checkout/update-intent-email`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentIntentId, email: emailValue, language: lang })
      });
      console.log('[Page3] Email updated on PaymentIntent');
    } catch (e) {
      // Non-fatal — log the warning but continue with payment.
      // The ticket will still be created; the email just won't send.
      console.warn('[Page3] Could not update email on PaymentIntent:', e);
    }
  }

  // Disable button and show loading
  showButtonLoading('Page3_PayButton', t(lang, 'payment.payingBtn'));
  
  try {
    // Confirm payment with Stripe
    console.log('[Page3] Confirming payment...');
    const result = await confirmPayment(
      stripe, 
      elements, 
      window.location.origin + '/page3.html'
    );
    
    if (!result.success) {
      console.error('[Page3] Payment failed:', result.error);
      hideButtonLoading('Page3_PayButton');
      showPaymentError(result.error || t(lang, 'payment.errorPayment'));
      scrollTo(getElementById('Page3_PaymentContainer'));
      return;
    }
    
    console.log('[Page3] Payment succeeded!');
    
    // Show processing modal
    openModal('Page3_ProcessingModal', 'processingModalBackdrop');
    
    // Poll for individual tickets (Phase 2 — carousel)
    try {
      console.log('[Page3] Polling for tickets...');
      const ticketResult = await pollForTickets(
        paymentIntentId,
        CONFIG.QR_POLL_INTERVAL,
        CONFIG.QR_POLL_TIMEOUT
      );
      
      console.log(`[Page3] Received ${ticketResult.tickets.length} ticket(s)`);
      
      // Store tickets for language switching
      currentTickets = ticketResult.tickets;
      
      // Close processing modal
      closeModal('Page3_ProcessingModal', 'processingModalBackdrop');
      
      // Update success message to mention showing each QR
      const successMsg = getElementById('Page3_SuccessMessage');
      if (successMsg) {
        setText(successMsg, t(lang, 'tickets.showAtEntrance'));
      }
      
      // Initialize the carousel with the tickets
      initCarousel('Page3_TicketCarousel', ticketResult.tickets, lang);
      
      // Open the success modal
      openModal('Page3_SuccessModal', 'successModalBackdrop');

      // Show email toast if buyer provided an email
      const emailInput = getElementById('Page3_EmailInput');
      const buyerEmail = emailInput ? emailInput.value.trim() : '';
      if (buyerEmail) {
        setTimeout(() => showEmailToast(lang), 10000);
      }
      
    } catch (pollError) {
      console.error('[Page3] Ticket polling failed:', pollError);
      closeModal('Page3_ProcessingModal', 'processingModalBackdrop');
      showPaymentError(t(lang, 'payment.errorTimeout'));
    }
    
  } catch (error) {
    console.error('[Page3] Payment error:', error);
    hideButtonLoading('Page3_PayButton');
    showPaymentError(t(lang, 'payment.errorGeneric'));
  }
  
  // Re-enable button
  hideButtonLoading('Page3_PayButton');
}

/**
 * Show the email toast notification inside the success modal.
 * Slides in from top, auto-hides after 8 seconds.
 * Only shows if the buyer provided an email.
 */
function showEmailToast(lang) {
  const toast = getElementById('Page3_EmailToast');
  const modal = getElementById('Page3_SuccessModal');
  const closeBtn = getElementById('emailToastClose');
  if (!toast || !modal) return;

  // Update text based on language
  const titleEl = getElementById('emailToastTitle');
  const subtitleEl = getElementById('emailToastSubtitle');

  if (titleEl) {
    setText(titleEl, t(lang, 'payment.emailToastTitle'));
  }
  if (subtitleEl) {
    // Build subtitle with accent spans
    const spamText = t(lang, 'payment.emailToastSpam');
    const notSpamText = t(lang, 'payment.emailToastNotSpam');
    const fullSubtitle = t(lang, 'payment.emailToastSubtitle');
    // Replace placeholders with bold spans
    subtitleEl.innerHTML = fullSubtitle
      .replace('{spam}', '<span class="email-toast-accent">' + spamText + '</span>')
      .replace('{notSpam}', '<span class="email-toast-accent">' + notSpamText + '</span>');
  }

  // Add class to push modal header down
  addClass(modal, 'has-toast');

  // Slide in
  requestAnimationFrame(() => {
    addClass(toast, 'visible');
  });

  // Close button
  if (closeBtn) {
    closeBtn.onclick = () => {
      removeClass(toast, 'visible');
      setTimeout(() => removeClass(modal, 'has-toast'), 400);
    };
  }

  // Auto-hide after 8 seconds
  setTimeout(() => {
    if (toast.classList.contains('visible')) {
      removeClass(toast, 'visible');
      setTimeout(() => removeClass(modal, 'has-toast'), 400);
    }
  }, 14000);
}

/**
 * Show terms warning
 */
function showTermsWarning() {
  const warning = getElementById('Page3_TermsWarningText');
  if (warning) {
    addClass(warning, 'visible');
  }
}

/**
 * Hide terms warning
 */
function hideTermsWarning() {
  const warning = getElementById('Page3_TermsWarningText');
  if (warning) {
    removeClass(warning, 'visible');
  }
}

/**
 * Show payment error
 * @param {string} message - Error message
 */
function showPaymentError(message) {
  const errorEl = getElementById('paymentError');
  if (errorEl) {
    setText(errorEl, message);
    addClass(errorEl, 'visible');
  }
}

/**
 * Hide payment error
 */
function hidePaymentError() {
  const errorEl = getElementById('paymentError');
  if (errorEl) {
    removeClass(errorEl, 'visible');
  }
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  cleanupStripe();
});

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage3);
} else {
  initPage3();
}