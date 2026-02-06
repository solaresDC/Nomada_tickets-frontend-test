/**
 * Page 2 (page2.html) JavaScript
 * Ticket quantity selection page
 */

import { initHeader, getCurrentLanguage } from '../components/header.js';
import { initQuantitySelector, getQuantities, showError, hideError } from '../components/quantity-selector.js';
import { openModal, closeModal } from '../components/modal.js';
import { getElementById, on, setText } from '../utils/dom.js';
import { saveTicketQuantities, getTicketQuantities } from '../utils/storage.js';
import { validateTicketSelection } from '../utils/validation.js';
import { t } from '../i18n/translations.js';

/**
 * Initialize Page 2
 */
export function initPage2() {
  console.log('[Page2] Initializing...');
  
  // Initialize header with language change callback
  const currentLang = initHeader(onLanguageChange);
  
  // Load any previously saved quantities
  const savedQuantities = getTicketQuantities();
  
  // Initialize quantity selector
  initQuantitySelector(savedQuantities, onQuantityChange);
  
  // Apply translations
  applyTranslations(currentLang);
  
  // Set up event listeners
  setupEventListeners();
  
  console.log('[Page2] Initialized');
}

/**
 * Handle language change
 * @param {string} lang - New language code
 */
function onLanguageChange(lang) {
  console.log('[Page2] Language changed to:', lang);
  applyTranslations(lang);
}

/**
 * Handle quantity changes
 * @param {{femaleQty: number, maleQty: number}} quantities
 */
function onQuantityChange(quantities) {
  console.log('[Page2] Quantities changed:', quantities);
  // Hide any previous error when user changes quantities
  hideError();
}

/**
 * Apply translations to page elements
 * @param {string} lang - Language code
 */
function applyTranslations(lang) {
  // Page title
  const titleEl = getElementById('Page2_TitleText');
  if (titleEl) {
    titleEl.innerHTML = `${t(lang, 'tickets.title')} <span class="highlight">${t(lang, 'tickets.titleHighlight')}</span>`;
  }
  
  // Subtitle
  const subtitleEl = getElementById('ticketSubtitle');
  if (subtitleEl) {
    setText(subtitleEl, t(lang, 'tickets.subtitle'));
  }
  
  // Female row
  const femaleLabelEl = getElementById('femaleLabelText');
  if (femaleLabelEl) {
    setText(femaleLabelEl, t(lang, 'tickets.femaleLabel'));
  }
  
  const femalePriceEl = getElementById('femalePriceText');
  if (femalePriceEl) {
    setText(femalePriceEl, t(lang, 'tickets.femalePrice'));
  }
  
  // Male row
  const maleLabelEl = getElementById('maleLabelText');
  if (maleLabelEl) {
    setText(maleLabelEl, t(lang, 'tickets.maleLabel'));
  }
  
  const malePriceEl = getElementById('malePriceText');
  if (malePriceEl) {
    setText(malePriceEl, t(lang, 'tickets.malePrice'));
  }
  
  // Continue button
  const continueBtn = getElementById('Page2_ContinueButton');
  if (continueBtn) {
    setText(continueBtn, t(lang, 'tickets.continueBtn'));
  }
  
  // Error text
  const errorEl = getElementById('Page2_QuantityErrorText');
  if (errorEl) {
    setText(errorEl, t(lang, 'tickets.errorNoTickets'));
  }
  
  // Warning modal
  const warningTitle = getElementById('Page2_WarningTitle');
  if (warningTitle) {
    setText(warningTitle, t(lang, 'tickets.warningTitle'));
  }
  
  const warningText = getElementById('Page2_WarningTextBox');
  if (warningText) {
    setText(warningText, t(lang, 'tickets.warningText'));
  }
  
  const warningContinueBtn = getElementById('Page2_WarningContinueButton');
  if (warningContinueBtn) {
    setText(warningContinueBtn, t(lang, 'tickets.warningContinueBtn'));
  }
  
  // Footer
  const copyright = getElementById('footerCopyright');
  if (copyright) {
    setText(copyright, t(lang, 'footer.copyright'));
  }
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
  // Continue button
  const continueBtn = getElementById('Page2_ContinueButton');
  if (continueBtn) {
    on(continueBtn, 'click', handleContinueClick);
  }
  
  // Warning modal continue button
  const warningContinueBtn = getElementById('Page2_WarningContinueButton');
  if (warningContinueBtn) {
    on(warningContinueBtn, 'click', handleWarningContinue);
  }
  
  // Modal backdrop click to close (optional)
  const modalBackdrop = getElementById('warningModalBackdrop');
  if (modalBackdrop) {
    on(modalBackdrop, 'click', (e) => {
      // Only close if clicking the backdrop itself, not the modal content
      if (e.target === modalBackdrop) {
        closeModal('Page2_WarningModal', 'warningModalBackdrop');
      }
    });
  }
}

/**
 * Handle continue button click
 */
function handleContinueClick() {
  const quantities = getQuantities();
  const lang = getCurrentLanguage();
  
  // Validate
  const validation = validateTicketSelection(quantities.femaleQty, quantities.maleQty);
  
  if (!validation.valid) {
    showError(t(lang, 'tickets.errorNoTickets'));
    return;
  }
  
  // Hide any previous error
  hideError();
  
  // Save quantities to localStorage
  saveTicketQuantities(quantities.femaleQty, quantities.maleQty);
  
  // Open warning modal
  openModal('Page2_WarningModal', 'warningModalBackdrop');
}

/**
 * Handle warning modal continue
 */
function handleWarningContinue() {
  // Close modal
  closeModal('Page2_WarningModal', 'warningModalBackdrop');
  
  // Navigate to page 3
  window.location.href = 'page3.html';
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage2);
} else {
  initPage2();
}