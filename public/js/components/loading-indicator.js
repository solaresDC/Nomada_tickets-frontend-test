/**
 * Loading Indicator Component
 * Shows/hides loading states for buttons and containers
 */

import { getElementById, addClass, removeClass, setText } from '../utils/dom.js';

/**
 * Show loading state on a button
 * @param {string} buttonId - Button element ID
 * @param {string} [loadingText] - Text to show while loading
 */
export function showButtonLoading(buttonId, loadingText = 'Loading...') {
  const button = getElementById(buttonId);
  if (!button) return;
  
  // Store original text
  button.dataset.originalText = button.textContent;
  
  // Set loading state
  button.disabled = true;
  button.textContent = loadingText;
  addClass(button, 'loading');
}

/**
 * Hide loading state on a button
 * @param {string} buttonId - Button element ID
 */
export function hideButtonLoading(buttonId) {
  const button = getElementById(buttonId);
  if (!button) return;
  
  // Restore original text
  const originalText = button.dataset.originalText;
  if (originalText) {
    button.textContent = originalText;
    delete button.dataset.originalText;
  }
  
  // Remove loading state
  button.disabled = false;
  removeClass(button, 'loading');
}

/**
 * Show a loading overlay on a container
 * @param {string} containerId - Container element ID
 */
export function showContainerLoading(containerId) {
  const container = getElementById(containerId);
  if (!container) return;
  
  // Create loading overlay if it doesn't exist
  let overlay = container.querySelector('.loading-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
      <div class="loading-spinner"></div>
    `;
    container.style.position = 'relative';
    container.appendChild(overlay);
  }
  
  addClass(overlay, 'active');
}

/**
 * Hide loading overlay on a container
 * @param {string} containerId - Container element ID
 */
export function hideContainerLoading(containerId) {
  const container = getElementById(containerId);
  if (!container) return;
  
  const overlay = container.querySelector('.loading-overlay');
  if (overlay) {
    removeClass(overlay, 'active');
  }
}

/**
 * Update loading text
 * @param {string} elementId - Element ID containing loading text
 * @param {string} text - New text
 */
export function updateLoadingText(elementId, text) {
  const element = getElementById(elementId);
  if (element) {
    setText(element, text);
  }
}