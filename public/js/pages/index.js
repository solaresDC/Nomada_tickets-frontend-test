/**
 * Page 1 (index.html) JavaScript
 * Landing page functionality
 *
 * CHANGES FROM ORIGINAL:
 * - "Events" button now opens the ticket lookup modal instead of scrolling
 * - Full lookup modal logic: form, lockout countdown, results carousel, resend
 * - Reference input auto-formats to NMD-XXXX-XXXX as user types
 */

import { initHeader, getCurrentLanguage } from '../components/header.js';
import { getElementById, on, setText, querySelectorAll } from '../utils/dom.js';
import { t } from '../i18n/translations.js';
import { CONFIG } from '../config/index.js';

// ─── State ────────────────────────────────────────────────────

let currentLang = 'en';
let carouselCurrentIndex = 0;
let carouselTotal = 0;
let lockoutTimer = null;
let touchStartX = 0;

// ─── Init ─────────────────────────────────────────────────────

export function initPage1() {
  console.log('[Page1] Initializing...');

  currentLang = initHeader(onLanguageChange);
  applyTranslations(currentLang);
  setupEventListeners();

  console.log('[Page1] Initialized');
}

function onLanguageChange(lang) {
  console.log('[Page1] Language changed to:', lang);
  currentLang = lang;
  applyTranslations(lang);
}

// ─── Translations ─────────────────────────────────────────────

function applyTranslations(lang) {
  const heroTitle = getElementById('heroTitle');
  if (heroTitle) {
    heroTitle.innerHTML = `${t(lang, 'home.heroTitle')} <span class="highlight">${t(lang, 'home.heroTitleHighlight')}</span> ${t(lang, 'home.heroTitleEnd')}`;
  }

  const heroSubtitle = getElementById('heroSubtitle');
  if (heroSubtitle) setText(heroSubtitle, t(lang, 'home.heroSubtitle'));

  const buyTicketBtn = getElementById('Page1_BuyTicketButton');
  if (buyTicketBtn) setText(buyTicketBtn, t(lang, 'home.buyTicketBtn'));

  const checkTicketsBtn = getElementById('Page1_CheckTicketsButton');
  if (checkTicketsBtn) setText(checkTicketsBtn, t(lang, 'home.checkTicketsBtn'));

  const bannerBtn = getElementById('Page1_BannerButton');
  if (bannerBtn) setText(bannerBtn, t(lang, 'home.bannerBtn'));

  const featuresTitle = getElementById('featuresTitle');
  if (featuresTitle) setText(featuresTitle, t(lang, 'home.featuresTitle'));

  const featureElements = [
    { titleId: 'feature1Title', descId: 'feature1Desc', titleKey: 'home.feature1Title', descKey: 'home.feature1Desc' },
    { titleId: 'feature2Title', descId: 'feature2Desc', titleKey: 'home.feature2Title', descKey: 'home.feature2Desc' },
    { titleId: 'feature3Title', descId: 'feature3Desc', titleKey: 'home.feature3Title', descKey: 'home.feature3Desc' },
    { titleId: 'feature4Title', descId: 'feature4Desc', titleKey: 'home.feature4Title', descKey: 'home.feature4Desc' },
  ];

  featureElements.forEach(({ titleId, descId, titleKey, descKey }) => {
    const title = getElementById(titleId);
    const desc = getElementById(descId);
    if (title) setText(title, t(lang, titleKey));
    if (desc) setText(desc, t(lang, descKey));
  });

  const copyright = getElementById('Page1_CopyrightText');
  if (copyright) setText(copyright, t(lang, 'footer.copyright'));

  translateLookupModal(lang);
}

// ─── Event Listeners ──────────────────────────────────────────

function setupEventListeners() {
  const buyTicketBtn = getElementById('Page1_BuyTicketButton');
  if (buyTicketBtn) {
    on(buyTicketBtn, 'click', () => {
      window.location.href = 'page2.html';
    });
  }

  const bannerBtn = getElementById('Page1_BannerButton');
  if (bannerBtn) {
    on(bannerBtn, 'click', () => {
      window.open('https://example.com', '_blank', 'noopener,noreferrer');
    });
  }

  const checkTicketsBtn = getElementById('Page1_CheckTicketsButton');
  if (checkTicketsBtn) {
    on(checkTicketsBtn, 'click', () => {
      openLookupModal();
    });
  }

  const backdrop = getElementById('LookupModal_Backdrop');
  if (backdrop) {
    on(backdrop, 'click', (e) => {
      if (e.target === backdrop) closeLookupModal();
    });
  }

  const closeBtn = getElementById('LookupModal_CloseBtn');
  if (closeBtn) on(closeBtn, 'click', closeLookupModal);

  const lookupForm = getElementById('LookupModal_Form');
  if (lookupForm) {
    on(lookupForm, 'submit', (e) => {
      e.preventDefault();
      handleLookupSubmit();
    });
  }

  // Auto-uppercase + auto-dash formatter: NMD-XXXX-XXXX
  const refInput = getElementById('LookupModal_RefInput');
  if (refInput) {
    on(refInput, 'input', () => {
      // Strip anything that isn't a letter or digit, uppercase, cap at 10 raw chars
      const raw = refInput.value.replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0, 11);

      // Insert dashes: NMD-XXXX-XXXX
      let formatted = raw;
      if (raw.length > 7) {
        formatted = raw.slice(0, 3) + '-' + raw.slice(3, 7) + '-' + raw.slice(7);
      } else if (raw.length > 3) {
        formatted = raw.slice(0, 3) + '-' + raw.slice(3);
      }

      refInput.value = formatted;
    });
  }

  const backBtn = getElementById('LookupModal_BackBtn');
  if (backBtn) on(backBtn, 'click', () => showFormView());

  const prevBtn = getElementById('LookupModal_CarouselPrev');
  const nextBtn = getElementById('LookupModal_CarouselNext');
  if (prevBtn) on(prevBtn, 'click', () => carouselGoTo(carouselCurrentIndex - 1));
  if (nextBtn) on(nextBtn, 'click', () => carouselGoTo(carouselCurrentIndex + 1));

  const carouselTrack = getElementById('LookupModal_CarouselTrack');
  if (carouselTrack) {
    on(carouselTrack, 'touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    on(carouselTrack, 'touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? carouselGoTo(carouselCurrentIndex + 1) : carouselGoTo(carouselCurrentIndex - 1);
      }
    }, { passive: true });
  }

  const resendBtn = getElementById('LookupModal_ResendBtn');
  if (resendBtn) on(resendBtn, 'click', handleResend);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const backdrop = getElementById('LookupModal_Backdrop');
      if (backdrop && backdrop.classList.contains('active')) {
        closeLookupModal();
      }
    }
  });
}

// ─── Modal Open / Close ───────────────────────────────────────

function openLookupModal() {
  const backdrop = getElementById('LookupModal_Backdrop');
  const modal = getElementById('LookupModal');
  if (!backdrop || !modal) return;

  showFormView();
  clearLookupError();
  clearResendFeedback();

  backdrop.classList.add('active');
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');

  setTimeout(() => {
    const emailInput = getElementById('LookupModal_EmailInput');
    if (emailInput) emailInput.focus();
  }, 50);
}

function closeLookupModal() {
  const backdrop = getElementById('LookupModal_Backdrop');
  const modal = getElementById('LookupModal');
  if (!backdrop || !modal) return;

  backdrop.classList.remove('active');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');

  if (lockoutTimer) {
    clearInterval(lockoutTimer);
    lockoutTimer = null;
  }
}

// ─── View Switching ───────────────────────────────────────────

function showFormView() {
  const formView = getElementById('LookupModal_FormView');
  const resultsView = getElementById('LookupModal_ResultsView');
  const lockoutView = getElementById('LookupModal_LockoutView');
  const submitBtn = getElementById('LookupModal_SubmitBtn');

  if (formView) formView.style.display = 'block';
  if (resultsView) resultsView.classList.remove('visible');
  if (lockoutView) lockoutView.classList.remove('visible');
  if (submitBtn) {
    submitBtn.disabled = false;
    setText(submitBtn, t(currentLang, 'lookup.submitBtn'));
  }

  clearLookupError();
}

function showResultsView() {
  const formView = getElementById('LookupModal_FormView');
  const resultsView = getElementById('LookupModal_ResultsView');

  if (formView) formView.style.display = 'none';
  if (resultsView) resultsView.classList.add('visible');
}

function showLockoutView(secondsRemaining) {
  const formView = getElementById('LookupModal_FormView');
  const lockoutView = getElementById('LookupModal_LockoutView');

  if (formView) formView.style.display = 'none';
  if (lockoutView) lockoutView.classList.add('visible');

  startLockoutCountdown(secondsRemaining);
}

// ─── Lockout Countdown ────────────────────────────────────────

function startLockoutCountdown(seconds) {
  const timerEl = getElementById('LookupModal_LockoutTimer');
  if (!timerEl) return;

  if (lockoutTimer) clearInterval(lockoutTimer);

  let remaining = seconds;
  updateTimerDisplay(timerEl, remaining);

  lockoutTimer = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearInterval(lockoutTimer);
      lockoutTimer = null;
      showFormView();
    } else {
      updateTimerDisplay(timerEl, remaining);
    }
  }, 1000);
}

function updateTimerDisplay(el, seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    el.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  } else {
    el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
}

// ─── Error Helpers ────────────────────────────────────────────

function showLookupError(message) {
  const errorEl = getElementById('LookupModal_Error');
  const errorText = getElementById('LookupModal_ErrorText');
  if (!errorEl || !errorText) return;

  setText(errorText, message);
  errorEl.classList.add('visible');
}

function clearLookupError() {
  const errorEl = getElementById('LookupModal_Error');
  if (errorEl) errorEl.classList.remove('visible');
}

// ─── Lookup Form Submit ───────────────────────────────────────

async function handleLookupSubmit() {
  const emailInput = getElementById('LookupModal_EmailInput');
  const refInput = getElementById('LookupModal_RefInput');
  const submitBtn = getElementById('LookupModal_SubmitBtn');

  if (!emailInput || !refInput) return;

  const email = emailInput.value.trim();
  const orderReference = refInput.value.trim().toUpperCase();

  if (!email || !email.includes('@')) {
    showLookupError(t(currentLang, 'lookup.errorNotFound'));
    return;
  }

  // Require 10 alphanumeric chars (dashes don't count toward length)
  if (!orderReference || orderReference.replace(/-/g, '').length < 10) {
    showLookupError(t(currentLang, 'lookup.errorNotFound'));
    return;
  }

  clearLookupError();

  if (submitBtn) {
    submitBtn.disabled = true;
    setText(submitBtn, t(currentLang, 'lookup.submittingBtn'));
  }

  try {
    const response = await fetch(`${CONFIG.BACKEND_URL}/api/tickets/lookup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, orderReference }),
    });

    const data = await response.json();

    if (response.status === 429) {
      showLockoutView(data.secondsRemaining || 60);
      return;
    }

    if (response.status === 404 || data.error === 'not_found') {
      showLookupError(t(currentLang, 'lookup.errorNotFound'));
      return;
    }

    if (response.status === 202 || data.status === 'pending') {
      showLookupError(t(currentLang, 'lookup.errorPending'));
      return;
    }

    if (!response.ok) {
      showLookupError(t(currentLang, 'lookup.errorGeneric'));
      return;
    }

    renderResults(data, email, orderReference);
    showResultsView();

  } catch (err) {
    console.error('[Lookup] Network error:', err);
    showLookupError(t(currentLang, 'lookup.errorNetwork'));
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      setText(submitBtn, t(currentLang, 'lookup.submitBtn'));
    }
  }
}

// ─── Render Results ───────────────────────────────────────────

function renderResults(data, email, orderReference) {
  const refEl = getElementById('LookupModal_OrderRef');
  if (refEl) refEl.textContent = data.orderReference || orderReference;

  const titleEl = getElementById('LookupModal_ResultsTitle');
  if (titleEl) setText(titleEl, t(currentLang, 'lookup.resultsTitle'));

  renderPaymentSummary(data.pricing);
  renderCarousel(data.tickets);

  const resendBtn = getElementById('LookupModal_ResendBtn');
  if (resendBtn) {
    resendBtn.dataset.email = email;
    resendBtn.dataset.ref = orderReference;
  }
}

function renderPaymentSummary(pricing) {
  if (!pricing) return;

  const { femaleQty, maleQty, subtotal, fee, total } = pricing;
  const currency = t(currentLang, 'lookup.summaryCurrency');

  const setRow = (id, label, value) => {
    const labelEl = getElementById(`${id}_Label`);
    const valueEl = getElementById(`${id}_Value`);
    if (labelEl) setText(labelEl, label);
    if (valueEl) setText(valueEl, value);
  };

  const femaleRow = getElementById('LookupSummary_FemaleRow');
  if (femaleRow) {
    femaleRow.style.display = femaleQty > 0 ? 'flex' : 'none';
    setRow('LookupSummary_Female', `${t(currentLang, 'lookup.summaryFemale')} ×${femaleQty}`, `$${(femaleQty * 1).toFixed(2)} ${currency}`);
  }

  const maleRow = getElementById('LookupSummary_MaleRow');
  if (maleRow) {
    maleRow.style.display = maleQty > 0 ? 'flex' : 'none';
    setRow('LookupSummary_Male', `${t(currentLang, 'lookup.summaryMale')} ×${maleQty}`, `$${(maleQty * 2).toFixed(2)} ${currency}`);
  }

  setRow('LookupSummary_Subtotal', t(currentLang, 'lookup.summarySubtotal'), `$${subtotal.toFixed(2)} ${currency}`);
  setRow('LookupSummary_Fee', t(currentLang, 'lookup.summaryFee'), `$${fee.toFixed(2)} ${currency}`);
  setRow('LookupSummary_Total', t(currentLang, 'lookup.summaryTotal'), `$${total.toFixed(2)} ${currency}`);
}

function renderCarousel(tickets) {
  if (!tickets || tickets.length === 0) return;

  carouselTotal = tickets.length;
  carouselCurrentIndex = 0;

  const slidesContainer = getElementById('LookupModal_CarouselSlides');
  if (!slidesContainer) return;

  slidesContainer.innerHTML = tickets.map((ticket, index) => {
    const isFemale = ticket.ticketType === 'female';
    const badgeClass = isFemale ? 'lookup-ticket-badge--female' : 'lookup-ticket-badge--male';
    const typeLabel = isFemale ? t(currentLang, 'lookup.womenTicket') : t(currentLang, 'lookup.menTicket');
    const usedHtml = ticket.status === 'used'
      ? `<div class="lookup-ticket-used">⚠ ${t(currentLang, 'lookup.ticketUsed')}</div>`
      : '';

    return `
      <div class="lookup-ticket-slide" aria-label="${typeLabel} — ${t(currentLang, 'lookup.ticketCounter').replace('{current}', index + 1).replace('{total}', carouselTotal)}">
        <img
          class="lookup-ticket-qr"
          src="${ticket.qrImageDataUrl}"
          alt="QR Code — ${typeLabel}"
          width="200"
          height="200"
        />
        <div class="lookup-ticket-badge ${badgeClass}">
          ${typeLabel}
        </div>
        ${usedHtml}
      </div>
    `;
  }).join('');

  const dotsContainer = getElementById('LookupModal_CarouselDots');
  if (dotsContainer) {
    dotsContainer.innerHTML = tickets.map((_, index) => `
      <button
        class="lookup-carousel-dot ${index === 0 ? 'active' : ''}"
        aria-label="Go to ticket ${index + 1}"
        data-index="${index}"
      ></button>
    `).join('');

    dotsContainer.querySelectorAll('.lookup-carousel-dot').forEach((dot) => {
      on(dot, 'click', () => carouselGoTo(parseInt(dot.dataset.index, 10)));
    });
  }

  updateCarouselUI();
}

// ─── Carousel Navigation ──────────────────────────────────────

function carouselGoTo(index) {
  if (index < 0 || index >= carouselTotal) return;
  carouselCurrentIndex = index;
  updateCarouselUI();
}

function updateCarouselUI() {
  const slidesContainer = getElementById('LookupModal_CarouselSlides');
  if (slidesContainer) {
    slidesContainer.style.transform = `translateX(-${carouselCurrentIndex * 100}%)`;
  }

  const counterEl = getElementById('LookupModal_CarouselCounter');
  if (counterEl) {
    const text = t(currentLang, 'lookup.ticketCounter')
      .replace('{current}', carouselCurrentIndex + 1)
      .replace('{total}', carouselTotal);
    setText(counterEl, text);
  }

  const dots = querySelectorAll('.lookup-carousel-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === carouselCurrentIndex);
  });

  const prevBtn = getElementById('LookupModal_CarouselPrev');
  const nextBtn = getElementById('LookupModal_CarouselNext');
  if (prevBtn) prevBtn.disabled = carouselCurrentIndex === 0;
  if (nextBtn) nextBtn.disabled = carouselCurrentIndex === carouselTotal - 1;
}

// ─── Resend ───────────────────────────────────────────────────

async function handleResend() {
  const resendBtn = getElementById('LookupModal_ResendBtn');
  if (!resendBtn) return;

  const email = resendBtn.dataset.email;
  const orderReference = resendBtn.dataset.ref;

  if (!email || !orderReference) return;

  clearResendFeedback();
  resendBtn.disabled = true;
  setText(resendBtn, t(currentLang, 'lookup.resendSending'));

  try {
    const response = await fetch(`${CONFIG.BACKEND_URL}/api/tickets/resend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, orderReference, language: currentLang }),
    });

    const data = await response.json();

    if (response.status === 429 || data.error === 'cap_exceeded') {
      showResendFeedback(t(currentLang, 'lookup.resendErrorCap'), false);
    } else if (!response.ok) {
      showResendFeedback(t(currentLang, 'lookup.resendErrorFail'), false);
    } else {
      showResendFeedback(t(currentLang, 'lookup.resendSuccess'), true);
    }

  } catch (err) {
    console.error('[Resend] Error:', err);
    showResendFeedback(t(currentLang, 'lookup.resendErrorFail'), false);
  } finally {
    resendBtn.disabled = false;
    setText(resendBtn, t(currentLang, 'lookup.resendBtn'));
  }
}

function showResendFeedback(message, isSuccess) {
  const feedbackEl = getElementById('LookupModal_ResendFeedback');
  if (!feedbackEl) return;

  feedbackEl.textContent = message;
  feedbackEl.className = `lookup-resend-feedback visible ${isSuccess ? 'lookup-resend-feedback--success' : 'lookup-resend-feedback--error'}`;
}

function clearResendFeedback() {
  const feedbackEl = getElementById('LookupModal_ResendFeedback');
  if (feedbackEl) feedbackEl.classList.remove('visible');
}

// ─── Modal i18n (live translate while open) ───────────────────

function translateLookupModal(lang) {
  const ids = [
    ['LookupModal_Title',          'lookup.modalTitle'],
    ['LookupModal_Subtitle',       'lookup.modalSubtitle'],
    ['LookupModal_EmailLabel',     'lookup.emailLabel'],
    ['LookupModal_RefLabel',       'lookup.refLabel'],
    ['LookupModal_RefHelper',      'lookup.refHelper'],
    ['LookupModal_SubmitBtn',      'lookup.submitBtn'],
    ['LookupModal_LockoutTitle',   'lookup.lockoutTitle'],
    ['LookupModal_LockoutMsg',     'lookup.lockoutMessage'],
    ['LookupModal_BackBtn',        'lookup.backBtn'],
    ['LookupModal_ResendBtn',      'lookup.resendBtn'],
    ['LookupSummary_Title',        'lookup.summaryTitle'],
  ];

  ids.forEach(([id, key]) => {
    const el = getElementById(id);
    if (el && !el.disabled) setText(el, t(lang, key));
  });

  const emailInput = getElementById('LookupModal_EmailInput');
  if (emailInput) emailInput.placeholder = t(lang, 'lookup.emailPlaceholder');

  const refInput = getElementById('LookupModal_RefInput');
  if (refInput) refInput.placeholder = t(lang, 'lookup.refPlaceholder');
}

// ─── Auto-init ────────────────────────────────────────────────

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage1);
} else {
  initPage1();
}