/**
 * Ticket Carousel Component
 * 
 * Displays a swipeable carousel of individual QR code tickets.
 * Supports:
 *   - Touch swipe on mobile
 *   - Arrow buttons on desktop
 *   - Dot indicator navigation
 *   - Translated ticket type labels (EN/ES/PT-BR)
 * 
 * Usage:
 *   import { initCarousel, updateCarouselLanguage } from './carousel.js';
 *   initCarousel(containerId, tickets, language);
 */

import { t } from '../i18n/translations.js';

// ─── State ───────────────────────────────────────
let currentIndex = 0;
let totalSlides = 0;
let trackEl = null;
let containerEl = null;

// Touch tracking
let touchStartX = 0;
let touchCurrentX = 0;
let isDragging = false;
const SWIPE_THRESHOLD = 50;   // Minimum px to count as a swipe

/**
 * Initialize the carousel with ticket data.
 * 
 * @param {string} containerId - The ID of the HTML container element
 * @param {Array<{id: string, ticketType: string, qrToken: string, qrImageDataUrl: string}>} tickets
 * @param {string} lang - Current language code ('en', 'es', 'pt-BR')
 */
export function initCarousel(containerId, tickets, lang) {
  containerEl = document.getElementById(containerId);
  if (!containerEl) {
    console.error('[Carousel] Container not found:', containerId);
    return;
  }

  totalSlides = tickets.length;
  currentIndex = 0;

  // Build the HTML
  containerEl.innerHTML = buildCarouselHTML(tickets, lang);

  // Grab the track element
  trackEl = containerEl.querySelector('.carousel-track');

  // Set up event listeners
  setupArrows();
  setupDots();
  setupTouchSwipe();

  // Initial position
  goToSlide(0);

  console.log(`[Carousel] Initialized with ${totalSlides} ticket(s)`);
}

/**
 * Build the full carousel HTML string.
 */
function buildCarouselHTML(tickets, lang) {
  const isSingle = tickets.length === 1;
  const singleClass = isSingle ? ' single-ticket' : '';

  // Build each slide
  const slidesHTML = tickets.map((ticket, index) => {
    const typeClass = ticket.ticketType === 'female' ? 'ticket-female' : 'ticket-male';
    const labelKey = ticket.ticketType === 'female' 
      ? 'tickets.womenTicket' 
      : 'tickets.menTicket';
    const labelText = t(lang, labelKey);

    return `
      <div class="carousel-slide" data-index="${index}">
        <img 
          class="qr-code-image" 
          src="${ticket.qrImageDataUrl}" 
          alt="${labelText} QR Code"
        >
        <span class="carousel-ticket-label ${typeClass}">
          <span class="carousel-ticket-dot"></span>
          ${labelText}
        </span>
      </div>
    `;
  }).join('');

  // Counter text: "1 of 3"
  const ofText = t(lang, 'tickets.of');

  // Dot indicators
  const dotsHTML = tickets.map((_, index) => 
    `<button class="carousel-dot${index === 0 ? ' active' : ''}" 
             data-index="${index}" 
             aria-label="Go to ticket ${index + 1}"></button>`
  ).join('');

  // Screenshot tip
  const tipText = t(lang, 'tickets.screenshotTip');

  return `
    <div class="carousel">
      <div class="carousel-track">
        ${slidesHTML}
      </div>
    </div>

    <div class="carousel-nav${singleClass}">
      <button class="carousel-arrow carousel-prev" aria-label="Previous ticket">
        &#8249;
      </button>
      <span class="carousel-counter">
        <span class="carousel-current">1</span> ${ofText} ${totalSlides}
      </span>
      <button class="carousel-arrow carousel-next" aria-label="Next ticket">
        &#8250;
      </button>
    </div>

    <div class="carousel-dots${singleClass}">
      ${dotsHTML}
    </div>

    <p class="carousel-tip">${tipText}</p>
  `;
}

/**
 * Navigate to a specific slide.
 */
function goToSlide(index) {
  if (index < 0 || index >= totalSlides) return;

  currentIndex = index;

  // Move the track
  if (trackEl) {
    trackEl.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Update counter
  const counterEl = containerEl.querySelector('.carousel-current');
  if (counterEl) {
    counterEl.textContent = currentIndex + 1;
  }

  // Update dots
  const dots = containerEl.querySelectorAll('.carousel-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });

  // Update arrow states
  const prevBtn = containerEl.querySelector('.carousel-prev');
  const nextBtn = containerEl.querySelector('.carousel-next');
  if (prevBtn) prevBtn.disabled = currentIndex === 0;
  if (nextBtn) nextBtn.disabled = currentIndex === totalSlides - 1;
}

/**
 * Set up arrow button click handlers.
 */
function setupArrows() {
  const prevBtn = containerEl.querySelector('.carousel-prev');
  const nextBtn = containerEl.querySelector('.carousel-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  }
}

/**
 * Set up dot indicator click handlers.
 */
function setupDots() {
  const dots = containerEl.querySelectorAll('.carousel-dot');
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index, 10);
      goToSlide(index);
    });
  });
}

/**
 * Set up touch swipe handling for mobile.
 */
function setupTouchSwipe() {
  const carousel = containerEl.querySelector('.carousel');
  if (!carousel) return;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchCurrentX = touchStartX;
    isDragging = true;
    trackEl?.classList.add('dragging');
  }, { passive: true });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    touchCurrentX = e.touches[0].clientX;

    // Calculate drag offset and apply it for live feedback
    const diff = touchCurrentX - touchStartX;
    const baseOffset = -(currentIndex * 100);
    const dragPercent = (diff / carousel.offsetWidth) * 100;
    
    if (trackEl) {
      trackEl.style.transform = `translateX(${baseOffset + dragPercent}%)`;
    }
  }, { passive: true });

  carousel.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    trackEl?.classList.remove('dragging');

    const diff = touchCurrentX - touchStartX;

    if (diff > SWIPE_THRESHOLD && currentIndex > 0) {
      // Swiped right → go to previous
      goToSlide(currentIndex - 1);
    } else if (diff < -SWIPE_THRESHOLD && currentIndex < totalSlides - 1) {
      // Swiped left → go to next
      goToSlide(currentIndex + 1);
    } else {
      // Didn't swipe far enough → snap back
      goToSlide(currentIndex);
    }
  });
}

/**
 * Update carousel text when the language changes.
 * Call this from page3.js when the user switches language.
 * 
 * @param {string} lang - New language code
 * @param {Array<{ticketType: string}>} tickets - The ticket data (for labels)
 */
export function updateCarouselLanguage(lang, tickets) {
  if (!containerEl) return;

  // Update ticket labels
  const labels = containerEl.querySelectorAll('.carousel-ticket-label');
  labels.forEach((label, index) => {
    if (!tickets[index]) return;
    const labelKey = tickets[index].ticketType === 'female' 
      ? 'tickets.womenTicket' 
      : 'tickets.menTicket';
    const dotHTML = '<span class="carousel-ticket-dot"></span>';
    label.innerHTML = `${dotHTML} ${t(lang, labelKey)}`;
  });

  // Update "X of Y" counter
  const counterEl = containerEl.querySelector('.carousel-counter');
  if (counterEl) {
    const ofText = t(lang, 'tickets.of');
    counterEl.innerHTML = `<span class="carousel-current">${currentIndex + 1}</span> ${ofText} ${totalSlides}`;
  }

  // Update tip
  const tipEl = containerEl.querySelector('.carousel-tip');
  if (tipEl) {
    tipEl.textContent = t(lang, 'tickets.screenshotTip');
  }
}