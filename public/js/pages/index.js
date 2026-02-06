/**
 * Page 1 (index.html) JavaScript
 * Landing page functionality
 */

import { initHeader, getCurrentLanguage } from '../components/header.js';
import { getElementById, on, setText, querySelectorAll } from '../utils/dom.js';
import { t } from '../i18n/translations.js';

/**
 * Initialize Page 1
 */
export function initPage1() {
  console.log('[Page1] Initializing...');
  
  // Initialize header with language change callback
  const currentLang = initHeader(onLanguageChange);
  
  // Apply translations
  applyTranslations(currentLang);
  
  // Set up event listeners
  setupEventListeners();
  
  console.log('[Page1] Initialized');
}

/**
 * Handle language change
 * @param {string} lang - New language code
 */
function onLanguageChange(lang) {
  console.log('[Page1] Language changed to:', lang);
  applyTranslations(lang);
}

/**
 * Apply translations to page elements
 * @param {string} lang - Language code
 */
function applyTranslations(lang) {
  // Hero section
  const heroTitle = getElementById('heroTitle');
  if (heroTitle) {
    heroTitle.innerHTML = `${t(lang, 'home.heroTitle')} <span class="highlight">${t(lang, 'home.heroTitleHighlight')}</span> ${t(lang, 'home.heroTitleEnd')}`;
  }
  
  const heroSubtitle = getElementById('heroSubtitle');
  if (heroSubtitle) {
    setText(heroSubtitle, t(lang, 'home.heroSubtitle'));
  }
  
  // Buttons
  const buyTicketBtn = getElementById('Page1_BuyTicketButton');
  if (buyTicketBtn) {
    setText(buyTicketBtn, t(lang, 'home.buyTicketBtn'));
  }
  
  const eventsBtn = getElementById('eventsButton');
  if (eventsBtn) {
    setText(eventsBtn, t(lang, 'home.eventsBtn'));
  }
  
  const bannerBtn = getElementById('Page1_BannerButton');
  if (bannerBtn) {
    setText(bannerBtn, t(lang, 'home.bannerBtn'));
  }
  
  // Features section
  const featuresTitle = getElementById('featuresTitle');
  if (featuresTitle) {
    setText(featuresTitle, t(lang, 'home.featuresTitle'));
  }
  
  // Feature cards
  const featureElements = [
    { titleId: 'feature1Title', descId: 'feature1Desc', titleKey: 'home.feature1Title', descKey: 'home.feature1Desc' },
    { titleId: 'feature2Title', descId: 'feature2Desc', titleKey: 'home.feature2Title', descKey: 'home.feature2Desc' },
    { titleId: 'feature3Title', descId: 'feature3Desc', titleKey: 'home.feature3Title', descKey: 'home.feature3Desc' },
    { titleId: 'feature4Title', descId: 'feature4Desc', titleKey: 'home.feature4Title', descKey: 'home.feature4Desc' }
  ];
  
  featureElements.forEach(({ titleId, descId, titleKey, descKey }) => {
    const title = getElementById(titleId);
    const desc = getElementById(descId);
    if (title) setText(title, t(lang, titleKey));
    if (desc) setText(desc, t(lang, descKey));
  });
  
  // Footer
  const copyright = getElementById('Page1_CopyrightText');
  if (copyright) {
    setText(copyright, t(lang, 'footer.copyright'));
  }
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
  // Buy ticket button
  const buyTicketBtn = getElementById('Page1_BuyTicketButton');
  if (buyTicketBtn) {
    on(buyTicketBtn, 'click', () => {
      window.location.href = 'page2.html';
    });
  }
  
  // Banner button (external link)
  const bannerBtn = getElementById('Page1_BannerButton');
  if (bannerBtn) {
    on(bannerBtn, 'click', () => {
      window.open('https://example.com', '_blank', 'noopener,noreferrer');
    });
  }
  
  // Events button (scroll or navigate)
  const eventsBtn = getElementById('eventsButton');
  if (eventsBtn) {
    on(eventsBtn, 'click', () => {
      // For now, scroll to features or navigate to events page
      const featuresSection = getElementById('featuresSection');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage1);
} else {
  initPage1();
}