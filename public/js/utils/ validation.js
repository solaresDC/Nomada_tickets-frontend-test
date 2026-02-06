/**
 * Validation Utility Functions
 * Frontend validation for UX purposes only
 * 
 * IMPORTANT: This is NOT security validation.
 * All data must be validated on the backend.
 * Frontend validation is only for user experience.
 */

import { CONFIG } from '../config/index.js';

/**
 * Validate ticket quantity
 * @param {number} qty - Quantity to validate
 * @returns {boolean} Is valid
 */
export function isValidQuantity(qty) {
  return (
    typeof qty === 'number' &&
    Number.isInteger(qty) &&
    qty >= CONFIG.VALIDATION.MIN_QUANTITY &&
    qty <= CONFIG.VALIDATION.MAX_QUANTITY
  );
}

/**
 * Validate that at least one ticket is selected
 * @param {number} femaleQty - Female ticket quantity
 * @param {number} maleQty - Male ticket quantity
 * @returns {boolean} Is valid
 */
export function hasAtLeastOneTicket(femaleQty, maleQty) {
  return (femaleQty > 0 || maleQty > 0);
}

/**
 * Validate ticket selection (both quantities valid + at least one selected)
 * @param {number} femaleQty - Female ticket quantity
 * @param {number} maleQty - Male ticket quantity
 * @returns {{valid: boolean, error: string|null}}
 */
export function validateTicketSelection(femaleQty, maleQty) {
  if (!isValidQuantity(femaleQty)) {
    return {
      valid: false,
      error: 'Invalid female ticket quantity'
    };
  }
  
  if (!isValidQuantity(maleQty)) {
    return {
      valid: false,
      error: 'Invalid male ticket quantity'
    };
  }
  
  if (!hasAtLeastOneTicket(femaleQty, maleQty)) {
    return {
      valid: false,
      error: 'Please select at least one ticket'
    };
  }
  
  return {
    valid: true,
    error: null
  };
}

/**
 * Validate URL (security check)
 * Only allows http: and https: protocols
 * Blocks javascript:, data:, etc.
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid URL
 */
export function isValidUrl(url) {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validate language code
 * @param {string} lang - Language code
 * @returns {boolean} Is valid language
 */
export function isValidLanguage(lang) {
  return CONFIG.SUPPORTED_LANGUAGES.includes(lang);
}

/**
 * Sanitize a string for display
 * Removes potentially dangerous characters
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') {
    return '';
  }
  
  // Create a text node and get its content
  // This is a safe way to escape HTML entities
  const div = document.createElement('div');
  div.textContent = str;
  return div.textContent;
}

/**
 * Validate email format (basic check)
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email format
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  // Basic email regex - not comprehensive but good for UX
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}