/**
 * Modal Component
 * Handles modal display, focus trapping, and accessibility
 */

import { getElementById, addClass, removeClass, on, off } from '../utils/dom.js';

// Track currently open modal
let currentModal = null;
let previousFocusElement = null;
let focusTrapHandler = null;

/**
 * Open a modal
 * @param {string} modalId - The modal element ID
 * @param {string} [backdropId] - The backdrop element ID (optional)
 */
export function openModal(modalId, backdropId = null) {
  const modal = getElementById(modalId);
  if (!modal) {
    console.warn('[Modal] Modal not found:', modalId);
    return;
  }
  
  // Store current focus to restore later
  previousFocusElement = document.activeElement;
  
  // Show backdrop if provided
  if (backdropId) {
    const backdrop = getElementById(backdropId);
    if (backdrop) {
      addClass(backdrop, 'active');
    }
  }
  
  // Show modal
  addClass(modal, 'active');
  currentModal = modal;
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
  
  // Set up focus trap
  setupFocusTrap(modal);
  
  // Focus first focusable element
  focusFirstElement(modal);
  
  // Set up ESC key handler
  on(document, 'keydown', handleEscKey);
  
  console.log('[Modal] Opened:', modalId);
}

/**
 * Close a modal
 * @param {string} modalId - The modal element ID
 * @param {string} [backdropId] - The backdrop element ID (optional)
 */
export function closeModal(modalId, backdropId = null) {
  const modal = getElementById(modalId);
  if (!modal) return;
  
  // Hide modal
  removeClass(modal, 'active');
  
  // Hide backdrop if provided
  if (backdropId) {
    const backdrop = getElementById(backdropId);
    if (backdrop) {
      removeClass(backdrop, 'active');
    }
  }
  
  // Restore body scroll
  document.body.style.overflow = '';
  
  // Remove focus trap
  removeFocusTrap();
  
  // Remove ESC key handler
  off(document, 'keydown', handleEscKey);
  
  // Restore previous focus
  if (previousFocusElement && typeof previousFocusElement.focus === 'function') {
    previousFocusElement.focus();
  }
  
  currentModal = null;
  previousFocusElement = null;
  
  console.log('[Modal] Closed:', modalId);
}

/**
 * Close currently open modal
 */
export function closeCurrentModal() {
  if (currentModal) {
    const modalId = currentModal.id;
    // Try to find associated backdrop
    const backdropId = modalId.replace('Modal', 'Backdrop');
    closeModal(modalId, backdropId);
  }
}

/**
 * Handle ESC key to close modal
 * @param {KeyboardEvent} e
 */
function handleEscKey(e) {
  if (e.key === 'Escape' && currentModal) {
    closeCurrentModal();
  }
}

/**
 * Set up focus trap within modal
 * @param {HTMLElement} modal
 */
function setupFocusTrap(modal) {
  const focusableElements = getFocusableElements(modal);
  
  if (focusableElements.length === 0) return;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  focusTrapHandler = (e) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  on(modal, 'keydown', focusTrapHandler);
}

/**
 * Remove focus trap
 */
function removeFocusTrap() {
  if (currentModal && focusTrapHandler) {
    off(currentModal, 'keydown', focusTrapHandler);
    focusTrapHandler = null;
  }
}

/**
 * Get all focusable elements within a container
 * @param {HTMLElement} container
 * @returns {HTMLElement[]}
 */
function getFocusableElements(container) {
  const focusableSelectors = [
    'button:not([disabled])',
    'a[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');
  
  return Array.from(container.querySelectorAll(focusableSelectors));
}

/**
 * Focus first focusable element in container
 * @param {HTMLElement} container
 */
function focusFirstElement(container) {
  const focusableElements = getFocusableElements(container);
  
  if (focusableElements.length > 0) {
    // Slight delay to ensure modal is visible
    setTimeout(() => {
      focusableElements[0].focus();
    }, 50);
  }
}

/**
 * Check if any modal is currently open
 * @returns {boolean}
 */
export function isModalOpen() {
  return currentModal !== null;
}