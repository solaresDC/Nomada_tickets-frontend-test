/**
 * LocalStorage Utility Functions
 * Safe wrapper around localStorage with error handling
 * 
 * Handles:
 * - JSON serialization/deserialization
 * - Error handling for storage quota exceeded
 * - Graceful fallback when localStorage is unavailable
 */

const STORAGE_PREFIX = 'nomada_';

/**
 * Check if localStorage is available
 * @returns {boolean}
 */
export function isStorageAvailable() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get prefixed key
 * @param {string} key - Key name
 * @returns {string}
 */
function getKey(key) {
  return `${STORAGE_PREFIX}${key}`;
}

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store (will be JSON stringified)
 * @returns {boolean} Success status
 */
export function setItem(key, value) {
  if (!isStorageAvailable()) {
    console.warn('[Storage] localStorage not available');
    return false;
  }
  
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(getKey(key), serialized);
    return true;
  } catch (error) {
    console.error('[Storage] Failed to save:', error);
    return false;
  }
}

/**
 * Get data from localStorage
 * @param {string} key - Storage key
 * @param {*} [defaultValue=null] - Default value if key doesn't exist
 * @returns {*} Stored value or default
 */
export function getItem(key, defaultValue = null) {
  if (!isStorageAvailable()) {
    return defaultValue;
  }
  
  try {
    const item = localStorage.getItem(getKey(key));
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error('[Storage] Failed to get:', error);
    return defaultValue;
  }
}

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export function removeItem(key) {
  if (!isStorageAvailable()) {
    return false;
  }
  
  try {
    localStorage.removeItem(getKey(key));
    return true;
  } catch (error) {
    console.error('[Storage] Failed to remove:', error);
    return false;
  }
}

/**
 * Clear all app-specific items from localStorage
 * Only removes items with our prefix
 * @returns {boolean} Success status
 */
export function clearAll() {
  if (!isStorageAvailable()) {
    return false;
  }
  
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error('[Storage] Failed to clear:', error);
    return false;
  }
}

// ============================================
// App-Specific Storage Functions
// ============================================

/**
 * Save selected language
 * @param {string} language - Language code (en, es, pt-BR)
 */
export function saveLanguage(language) {
  setItem('language', language);
}

/**
 * Get saved language
 * @returns {string} Language code or 'en' as default
 */
export function getLanguage() {
  return getItem('language', 'en');
}

/**
 * Save ticket quantities
 * @param {number} femaleQty - Female ticket quantity
 * @param {number} maleQty - Male ticket quantity
 */
export function saveTicketQuantities(femaleQty, maleQty) {
  setItem('tickets', { femaleQty, maleQty });
}

/**
 * Get saved ticket quantities
 * @returns {{femaleQty: number, maleQty: number}}
 */
export function getTicketQuantities() {
  return getItem('tickets', { femaleQty: 0, maleQty: 0 });
}

/**
 * Clear ticket quantities
 */
export function clearTicketQuantities() {
  removeItem('tickets');
}