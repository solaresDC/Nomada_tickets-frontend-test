/**
 * Nomada Waitlist — Main Entry Point
 */

import { CONFIG } from './config/index.js';
import { t } from './i18n/translations.js';
import { getLanguage, saveLanguage } from './utils/storage.js';
import { validateEmail, validateInstagram, normalizeInstagram } from './utils/validation.js';
import { insertWaitlistEntry, keepAlive } from './utils/neon.js';

// ── State ──────────────────────────────────────────
let lang = getLanguage();
if (!CONFIG.SUPPORTED_LANGUAGES.includes(lang)) lang = CONFIG.DEFAULT_LANGUAGE;

// ── DOM references ─────────────────────────────────
const langBtn        = document.getElementById('lang-btn');
const langBtnLabel   = document.getElementById('lang-btn-label');
const langDropdown   = document.getElementById('lang-dropdown');
const langOptions    = document.querySelectorAll('.lang-option');

const emailInput     = document.getElementById('email-input');
const emailGhost     = document.getElementById('email-ghost');
const emailError     = document.getElementById('email-error');

const instaInput     = document.getElementById('insta-input');
const instaGhost     = document.getElementById('insta-ghost');
const instaError     = document.getElementById('insta-error');

const submitBtn      = document.getElementById('submit-btn');

const modalOverlay   = document.getElementById('modal-overlay');
const modalTitle     = document.getElementById('modal-title');
const modalMessage   = document.getElementById('modal-message');
const modalCloseBtn  = document.getElementById('modal-close-btn');

const translatableEls = document.querySelectorAll('[data-i18n]');

// ── Render ─────────────────────────────────────────
function applyTranslations() {
  translatableEls.forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(lang, key);
  });

  document.querySelectorAll('[data-placeholder-i18n]').forEach(el => {
    el.placeholder = t(lang, el.dataset.placeholderI18n);
  });

  langBtnLabel.textContent = t(lang, 'languageLabel');
  document.documentElement.lang = lang;

  // Re-render ghost hints instantly on language switch if visible
  if (emailGhost.classList.contains('is-visible')) {
    emailGhost.textContent = t(lang, 'ghostSure');
  }
  if (instaGhost.classList.contains('is-visible')) {
    instaGhost.textContent = t(lang, 'ghostInstagram');
  }
}

function updateActiveLangOption() {
  langOptions.forEach(opt => {
    opt.classList.toggle('is-active', opt.dataset.lang === lang);
  });
}

applyTranslations();
updateActiveLangOption();

// ── Language Switcher ──────────────────────────────
function toggleDropdown(open) {
  langDropdown.classList.toggle('is-open', open);
  langBtn.setAttribute('aria-expanded', String(open));
}

langBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = langDropdown.classList.contains('is-open');
  toggleDropdown(!isOpen);
});

langOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    lang = opt.dataset.lang;
    saveLanguage(lang);
    applyTranslations();
    updateActiveLangOption();
    toggleDropdown(false);
    clearErrors();
  });
});

document.addEventListener('click', () => toggleDropdown(false));

// ── Instagram @ prefix logic ───────────────────────
instaInput.addEventListener('focus', () => {
  if (!instaInput.value.startsWith('@')) {
    instaInput.value = '@';
  }
  // FIX: setTimeout lets the browser finish its own focus/cursor placement
  // before we force the cursor to the end — prevents it landing before the @
  setTimeout(() => {
    const len = instaInput.value.length;
    instaInput.setSelectionRange(len, len);
  }, 0);
});

// Clear field if user leaves without typing anything beyond @
instaInput.addEventListener('blur', () => {
  if (instaInput.value === '@' || instaInput.value === '') {
    instaInput.value = '';
    instaGhost.classList.remove('is-visible');
    instaError.textContent = '';
    instaInput.classList.remove('has-error');
  }
});

instaInput.addEventListener('keydown', (e) => {
  const cursorPos = instaInput.selectionStart;
  // Block any key that would delete the @
  if ((e.key === 'Backspace' && cursorPos <= 1 && instaInput.selectionEnd <= 1) ||
      (e.key === 'Delete' && cursorPos === 0)) {
    e.preventDefault();
  }
  // Block cursor from moving before the @ with arrow keys or Home key
  if ((e.key === 'ArrowLeft' || e.key === 'Home') && cursorPos <= 1) {
    e.preventDefault();
    instaInput.setSelectionRange(1, 1);
  }
});

instaInput.addEventListener('input', () => {
  // Safety net — restore @ if somehow removed (paste, select-all, etc.)
  if (!instaInput.value.startsWith('@')) {
    const restored = '@' + instaInput.value.replace(/^@*/, '');
    instaInput.value = restored;
    instaInput.setSelectionRange(restored.length, restored.length);
  }
  const val = instaInput.value;
  const show = val.length > 1;
  instaGhost.textContent = t(lang, 'ghostInstagram');
  instaGhost.classList.toggle('is-visible', show);
  instaError.textContent = '';
  instaInput.classList.remove('has-error');
});

// ── Email ghost hint ───────────────────────────────
emailInput.addEventListener('input', () => {
  const val = emailInput.value;
  const show = val.length > 0;
  emailGhost.textContent = t(lang, 'ghostSure');
  emailGhost.classList.toggle('is-visible', show);
  emailError.textContent = '';
  emailInput.classList.remove('has-error');
});

// ── Validation helpers ─────────────────────────────
function clearErrors() {
  emailError.textContent = '';
  instaError.textContent = '';
  emailInput.classList.remove('has-error');
  instaInput.classList.remove('has-error');
}

function showEmailError(msgKey) {
  emailError.textContent = t(lang, msgKey);
  emailInput.classList.add('has-error');
}

function showInstaError(msgKey) {
  instaError.textContent = t(lang, msgKey);
  instaInput.classList.add('has-error');
}

// ── Form submission ────────────────────────────────
submitBtn.addEventListener('click', async () => {
  clearErrors();

  const emailVal = emailInput.value.trim();
  const instaRaw = instaInput.value.trim();
  const instaVal = instaRaw === '@' ? '' : instaRaw.replace(/^@/, '');

  let emailValid = false;
  let instaValid = false;

  if (emailVal) {
    const result = validateEmail(emailVal);
    if (!result.valid) {
      showEmailError('errorInvalidEmail');
      return;
    }
    emailValid = true;
  }

  if (instaVal) {
    const result = validateInstagram(instaVal);
    if (!result.valid) {
      showInstaError(result.error === 'invalidInstagram' ? 'errorInvalidInstagram' : 'errorEmpty');
      return;
    }
    instaValid = true;
  }

  if (!emailValid && !instaValid) {
    showEmailError('errorEmpty');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = '...';

  try {
    const submissions = [];

    if (emailValid) {
      submissions.push(
        insertWaitlistEntry({ contactType: 'email', contactValue: emailVal, language: lang })
      );
    }

    if (instaValid) {
      submissions.push(
        insertWaitlistEntry({ contactType: 'instagram', contactValue: normalizeInstagram(instaVal), language: lang })
      );
    }

    const results = await Promise.all(submissions);

    const anySuccess = results.some(r => r.success === true);
    const allDuplicate = results.every(r => r.duplicate === true);

    if (allDuplicate) {
      if (emailValid) showEmailError('errorDuplicate');
      if (instaValid) showInstaError('errorDuplicate');
      return;
    }

    if (anySuccess) {
      openModal();
    }

  } catch (err) {
    console.error('[Nomada] Submit error:', err);
    showEmailError('errorGeneral');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = t(lang, 'submitButton');
  }
});

// ── Modal ──────────────────────────────────────────
function openModal() {
  modalTitle.textContent = t(lang, 'successTitle');
  modalMessage.textContent = t(lang, 'successMessage');
  modalCloseBtn.textContent = t(lang, 'successClose');
  modalOverlay.classList.add('is-open');
  emailInput.value = '';
  instaInput.value = '';
  emailGhost.classList.remove('is-visible');
  instaGhost.classList.remove('is-visible');
  clearErrors();
}

modalCloseBtn.addEventListener('click', () => {
  modalOverlay.classList.remove('is-open');
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.remove('is-open');
});

// ── Neon Keep-Alive Cron ───────────────────────────
keepAlive();
setInterval(keepAlive, CONFIG.KEEPALIVE_INTERVAL_MS);