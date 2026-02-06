/**
 * Header Component
 * Handles header functionality including language switching
 */

import { getElementById, on, addClass, removeClass, hasClass } from '../utils/dom.js';
import { getLanguage, saveLanguage } from '../utils/storage.js';
import { t } from '../i18n/translations.js';
import { CONFIG } from '../config/index.js';

// Current language state
let currentLanguage = 'en';

// Callback for when language changes
let onLanguageChangeCallback = null;

/**
 * Initialize the header component
 * @param {Function} [onLanguageChange] - Callback when language changes
 */
export function initHeader(onLanguageChange = null) {
  onLanguageChangeCallback = onLanguageChange;
  
  // Load saved language
  currentLanguage = getLanguage();
  
  // Validate language
  if (!CONFIG.SUPPORTED_LANGUAGES.includes(currentLanguage)) {
    currentLanguage = CONFIG.DEFAULT_LANGUAGE;
  }
  
  // Set up event listeners
  setupLanguageSelector();
  
  // Update UI with current language
  updateHeaderText();
  updateLanguageButtonText();
  
  console.log('[Header] Initialized with language:', currentLanguage);
  
  return currentLanguage;
}

/**
 * Set up language selector dropdown
 */
function setupLanguageSelector() {
  const languageButton = getElementById('Header_LanguageButton');
  const languageDropdown = getElementById('Header_LanguageDropdown');
  
  if (!languageButton || !languageDropdown) {
    console.warn('[Header] Language selector elements not found');
    return;
  }
  
  // Toggle dropdown on button click
  on(languageButton, 'click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });
  
  // Handle keyboard navigation
  on(languageButton, 'keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown();
    } else if (e.key === 'Escape') {
      closeDropdown();
    }
  });
  
  // Close dropdown when clicking outside
  on(document, 'click', (e) => {
    if (!languageButton.contains(e.target) && !languageDropdown.contains(e.target)) {
      closeDropdown();
    }
  });
  
  // Set up language option buttons
  const options = [
    { id: 'Header_LanguageOption_EN', lang: 'en' },
    { id: 'Header_LanguageOption_ES', lang: 'es' },
    { id: 'Header_LanguageOption_PTBR', lang: 'pt-BR' }
  ];
  
  options.forEach(({ id, lang }) => {
    const option = getElementById(id);
    if (option) {
      on(option, 'click', () => selectLanguage(lang));
      on(option, 'keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectLanguage(lang);
        }
      });
    }
  });
  
  // Mark current language as active
  updateActiveLanguageOption();
}

/**
 * Toggle dropdown open/closed
 */
function toggleDropdown() {
  const languageButton = getElementById('Header_LanguageButton');
  const languageDropdown = getElementById('Header_LanguageDropdown');
  
  if (!languageDropdown) return;
  
  const isOpen = hasClass(languageDropdown, 'active');
  
  if (isOpen) {
    closeDropdown();
  } else {
    addClass(languageDropdown, 'active');
    languageButton?.setAttribute('aria-expanded', 'true');
  }
}

/**
 * Close the dropdown
 */
function closeDropdown() {
  const languageButton = getElementById('Header_LanguageButton');
  const languageDropdown = getElementById('Header_LanguageDropdown');
  
  if (languageDropdown) {
    removeClass(languageDropdown, 'active');
  }
  if (languageButton) {
    languageButton.setAttribute('aria-expanded', 'false');
  }
}

/**
 * Select a language
 * @param {string} lang - Language code
 */
function selectLanguage(lang) {
  if (!CONFIG.SUPPORTED_LANGUAGES.includes(lang)) {
    console.warn('[Header] Invalid language:', lang);
    return;
  }
  
  if (lang === currentLanguage) {
    closeDropdown();
    return;
  }
  
  currentLanguage = lang;
  saveLanguage(lang);
  
  // Update UI
  updateHeaderText();
  updateLanguageButtonText();
  updateActiveLanguageOption();
  closeDropdown();
  
  console.log('[Header] Language changed to:', lang);
  
  // Notify callback
  if (onLanguageChangeCallback) {
    onLanguageChangeCallback(lang);
  }
}

/**
 * Update header text based on current language
 */
function updateHeaderText() {
  const bylineText = getElementById('Header_BylineText');
  if (bylineText) {
    bylineText.textContent = t(currentLanguage, 'header.byline');
  }
}

/**
 * Update language button text
 */
function updateLanguageButtonText() {
  const languageButton = getElementById('Header_LanguageButton');
  if (!languageButton) return;
  
  const textSpan = languageButton.querySelector('span:not(.language-button-icon)');
  if (textSpan) {
    const langNames = {
      'en': 'EN',
      'es': 'ES',
      'pt-BR': 'PT'
    };
    textSpan.textContent = langNames[currentLanguage] || 'EN';
  }
}

/**
 * Update active state on language options
 */
function updateActiveLanguageOption() {
  const options = [
    { id: 'Header_LanguageOption_EN', lang: 'en' },
    { id: 'Header_LanguageOption_ES', lang: 'es' },
    { id: 'Header_LanguageOption_PTBR', lang: 'pt-BR' }
  ];
  
  options.forEach(({ id, lang }) => {
    const option = getElementById(id);
    if (option) {
      if (lang === currentLanguage) {
        addClass(option, 'active');
        option.setAttribute('aria-selected', 'true');
      } else {
        removeClass(option, 'active');
        option.setAttribute('aria-selected', 'false');
      }
    }
  });
}

/**
 * Get current language
 * @returns {string} Current language code
 */
export function getCurrentLanguage() {
  return currentLanguage;
}

/**
 * Set language programmatically
 * @param {string} lang - Language code
 */
export function setLanguage(lang) {
  selectLanguage(lang);
}