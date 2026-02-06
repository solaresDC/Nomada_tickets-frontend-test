/**
 * Quantity Selector Component
 * Handles increment/decrement of ticket quantities
 */

import { getElementById, on, setText, addClass, removeClass } from '../utils/dom.js';
import { CONFIG } from '../config/index.js';
import { debounce } from '../utils/dom.js';

// State
let femaleQty = 0;
let maleQty = 0;

// Callback for quantity changes
let onChangeCallback = null;

/**
 * Initialize quantity selector
 * @param {Object} [initialValues] - Initial quantities
 * @param {Function} [onChange] - Callback when quantities change
 */
export function initQuantitySelector(initialValues = {}, onChange = null) {
  femaleQty = initialValues.femaleQty || 0;
  maleQty = initialValues.maleQty || 0;
  onChangeCallback = onChange;
  
  // Set up button listeners
  setupButtons();
  
  // Update display
  updateDisplay();
  
  console.log('[QuantitySelector] Initialized:', { femaleQty, maleQty });
}

/**
 * Set up button event listeners
 */
function setupButtons() {
  // Female buttons
  const femaleMinus = getElementById('Page2_FemaleMinusButton');
  const femalePlus = getElementById('Page2_FemalePlusButton');
  
  if (femaleMinus) {
    on(femaleMinus, 'click', debounce(() => decrement('female'), 100));
  }
  if (femalePlus) {
    on(femalePlus, 'click', debounce(() => increment('female'), 100));
  }
  
  // Male buttons
  const maleMinus = getElementById('Page2_MaleMinusButton');
  const malePlus = getElementById('Page2_MalePlusButton');
  
  if (maleMinus) {
    on(maleMinus, 'click', debounce(() => decrement('male'), 100));
  }
  if (malePlus) {
    on(malePlus, 'click', debounce(() => increment('male'), 100));
  }
}

/**
 * Increment quantity
 * @param {string} type - 'female' or 'male'
 */
function increment(type) {
  if (type === 'female' && femaleQty < CONFIG.VALIDATION.MAX_QUANTITY) {
    femaleQty++;
    updateDisplay();
    notifyChange();
  } else if (type === 'male' && maleQty < CONFIG.VALIDATION.MAX_QUANTITY) {
    maleQty++;
    updateDisplay();
    notifyChange();
  }
}

/**
 * Decrement quantity
 * @param {string} type - 'female' or 'male'
 */
function decrement(type) {
  if (type === 'female' && femaleQty > CONFIG.VALIDATION.MIN_QUANTITY) {
    femaleQty--;
    updateDisplay();
    notifyChange();
  } else if (type === 'male' && maleQty > CONFIG.VALIDATION.MIN_QUANTITY) {
    maleQty--;
    updateDisplay();
    notifyChange();
  }
}

/**
 * Update all quantity displays
 */
function updateDisplay() {
  // Update quantity boxes
  const femaleBox = getElementById('Page2_FemaleQuantityBox');
  const maleBox = getElementById('Page2_MaleQuantityBox');
  
  if (femaleBox) {
    femaleBox.value = femaleQty;
  }
  if (maleBox) {
    maleBox.value = maleQty;
  }
  
  // Update indicator counters
  const femaleCounter = getElementById('Page2_FemaleCounterSquare');
  const maleCounter = getElementById('Page2_MaleCounterSquare');
  
  if (femaleCounter) {
    setText(femaleCounter, femaleQty.toString());
  }
  if (maleCounter) {
    setText(maleCounter, maleQty.toString());
  }
  
  // Update button states (disable at limits)
  updateButtonStates();
}

/**
 * Update button disabled states
 */
function updateButtonStates() {
  const femaleMinus = getElementById('Page2_FemaleMinusButton');
  const femalePlus = getElementById('Page2_FemalePlusButton');
  const maleMinus = getElementById('Page2_MaleMinusButton');
  const malePlus = getElementById('Page2_MalePlusButton');
  
  // Female buttons
  if (femaleMinus) {
    femaleMinus.disabled = femaleQty <= CONFIG.VALIDATION.MIN_QUANTITY;
  }
  if (femalePlus) {
    femalePlus.disabled = femaleQty >= CONFIG.VALIDATION.MAX_QUANTITY;
  }
  
  // Male buttons
  if (maleMinus) {
    maleMinus.disabled = maleQty <= CONFIG.VALIDATION.MIN_QUANTITY;
  }
  if (malePlus) {
    malePlus.disabled = maleQty >= CONFIG.VALIDATION.MAX_QUANTITY;
  }
}

/**
 * Notify change callback
 */
function notifyChange() {
  if (onChangeCallback) {
    onChangeCallback({ femaleQty, maleQty });
  }
}

/**
 * Get current quantities
 * @returns {{femaleQty: number, maleQty: number}}
 */
export function getQuantities() {
  return { femaleQty, maleQty };
}

/**
 * Set quantities programmatically
 * @param {number} female - Female quantity
 * @param {number} male - Male quantity
 */
export function setQuantities(female, male) {
  femaleQty = Math.max(CONFIG.VALIDATION.MIN_QUANTITY, Math.min(CONFIG.VALIDATION.MAX_QUANTITY, female));
  maleQty = Math.max(CONFIG.VALIDATION.MIN_QUANTITY, Math.min(CONFIG.VALIDATION.MAX_QUANTITY, male));
  updateDisplay();
}

/**
 * Reset quantities to zero
 */
export function resetQuantities() {
  femaleQty = 0;
  maleQty = 0;
  updateDisplay();
}

/**
 * Show error message
 * @param {string} message - Error message
 */
export function showError(message) {
  const errorEl = getElementById('Page2_QuantityErrorText');
  if (errorEl) {
    setText(errorEl, message);
    addClass(errorEl, 'visible');
  }
}

/**
 * Hide error message
 */
export function hideError() {
  const errorEl = getElementById('Page2_QuantityErrorText');
  if (errorEl) {
    removeClass(errorEl, 'visible');
  }
}