/**
 * DOM Utility Functions
 * Helper functions for DOM manipulation
 * 
 * These utilities provide safe, consistent DOM operations
 * and reduce code duplication across the application.
 */

/**
 * Safely get an element by ID
 * @param {string} id - Element ID
 * @returns {HTMLElement|null}
 */
export function getElementById(id) {
  return document.getElementById(id);
}

/**
 * Safely query a single element
 * @param {string} selector - CSS selector
 * @param {HTMLElement} [parent=document] - Parent element to search within
 * @returns {HTMLElement|null}
 */
export function querySelector(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Safely query multiple elements
 * @param {string} selector - CSS selector
 * @param {HTMLElement} [parent=document] - Parent element to search within
 * @returns {NodeListOf<HTMLElement>}
 */
export function querySelectorAll(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

/**
 * Add event listener with optional delegation
 * @param {HTMLElement|string} target - Element or selector
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @param {Object} [options] - Event listener options
 */
export function on(target, event, handler, options = {}) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  if (element) {
    element.addEventListener(event, handler, options);
  }
}

/**
 * Remove event listener
 * @param {HTMLElement|string} target - Element or selector
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 */
export function off(target, event, handler) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  if (element) {
    element.removeEventListener(event, handler);
  }
}

/**
 * Add a class to an element
 * @param {HTMLElement|string} target - Element or selector
 * @param {string} className - Class name to add
 */
export function addClass(target, className) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  if (element) {
    element.classList.add(className);
  }
}

/**
 * Remove a class from an element
 * @param {HTMLElement|string} target - Element or selector
 * @param {string} className - Class name to remove
 */
export function removeClass(target, className) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  if (element) {
    element.classList.remove(className);
  }
}

/**
 * Toggle a class on an element
 * @param {HTMLElement|string} target - Element or selector
 * @param {string} className - Class name to toggle
 * @returns {boolean|undefined} New state of the class
 */
export function toggleClass(target, className) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  if (element) {
    return element.classList.toggle(className);
  }
}

/**
 * Check if element has a class
 * @param {HTMLElement|string} target - Element or selector
 * @param {string} className - Class name to check
 * @returns {boolean}
 */
export function hasClass(target, className) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  return element ? element.classList.contains(className) : false;
}

/**
 * Set text content safely (prevents XSS)
 * @param {HTMLElement|string} target - Element or selector
 * @param {string} text - Text content
 */
export function setText(target, text) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  if (element) {
    element.textContent = text;
  }
}

/**
 * Get text content from element
 * @param {HTMLElement|string} target - Element or selector
 * @returns {string}
 */
export function getText(target) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  return element ? element.textContent || '' : '';
}

/**
 * Set an attribute on an element
 * @param {HTMLElement|string} target - Element or selector
 * @param {string} attr - Attribute name
 * @param {string} value - Attribute value
 */
export function setAttr(target, attr, value) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  if (element) {
    element.setAttribute(attr, value);
  }
}

/**
 * Get an attribute from an element
 * @param {HTMLElement|string} target - Element or selector
 * @param {string} attr - Attribute name
 * @returns {string|null}
 */
export function getAttr(target, attr) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  return element ? element.getAttribute(attr) : null;
}

/**
 * Remove an attribute from an element
 * @param {HTMLElement|string} target - Element or selector
 * @param {string} attr - Attribute name
 */
export function removeAttr(target, attr) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  if (element) {
    element.removeAttribute(attr);
  }
}

/**
 * Show an element (remove hidden state)
 * @param {HTMLElement|string} target - Element or selector
 */
export function show(target) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  if (element) {
    element.style.display = '';
    element.removeAttribute('hidden');
  }
}

/**
 * Hide an element
 * @param {HTMLElement|string} target - Element or selector
 */
export function hide(target) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  if (element) {
    element.style.display = 'none';
    element.setAttribute('hidden', '');
  }
}

/**
 * Disable an element (button, input, etc.)
 * @param {HTMLElement|string} target - Element or selector
 */
export function disable(target) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  if (element) {
    element.disabled = true;
    element.setAttribute('aria-disabled', 'true');
  }
}

/**
 * Enable an element
 * @param {HTMLElement|string} target - Element or selector
 */
export function enable(target) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  if (element) {
    element.disabled = false;
    element.removeAttribute('aria-disabled');
  }
}

/**
 * Scroll to an element smoothly
 * @param {HTMLElement|string} target - Element or selector
 * @param {Object} [options] - Scroll options
 */
export function scrollTo(target, options = {}) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...options
    });
  }
}

/**
 * Focus an element
 * @param {HTMLElement|string} target - Element or selector
 */
export function focus(target) {
  const element = typeof target === 'string' ? querySelector(target) : target;
  if (element && typeof element.focus === 'function') {
    element.focus();
  }
}

/**
 * Create a debounced version of a function
 * Prevents function from being called too frequently
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function}
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Wait for DOM to be ready
 * @param {Function} callback - Function to call when DOM is ready
 */
export function onDOMReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}