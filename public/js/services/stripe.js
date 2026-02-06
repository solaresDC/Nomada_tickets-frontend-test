/**
 * Stripe Service
 * Handles Stripe.js initialization and payment processing
 * 
 * SECURITY NOTES:
 * - Only use Stripe.js from https://js.stripe.com
 * - Never store clientSecret in localStorage or URL
 * - clientSecret is kept in memory only
 */

import { CONFIG } from '../config/index.js';

// Stripe instance (initialized once)
let stripeInstance = null;
let elementsInstance = null;

/**
 * Load Stripe.js dynamically
 * @returns {Promise<void>}
 */
async function loadStripeScript() {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.Stripe) {
      resolve();
      return;
    }
    
    // Check if script is already in DOM
    if (document.querySelector('script[src*="js.stripe.com"]')) {
      // Wait for it to load
      const checkInterval = setInterval(() => {
        if (window.Stripe) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      return;
    }
    
    // Create and append script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    
    script.onload = () => {
      console.log('[Stripe] Script loaded');
      resolve();
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Stripe.js'));
    };
    
    document.head.appendChild(script);
  });
}

/**
 * Initialize Stripe
 * @returns {Promise<Stripe>} Stripe instance
 */
export async function initializeStripe() {
  if (stripeInstance) {
    return stripeInstance;
  }
  
  await loadStripeScript();
  
  if (!window.Stripe) {
    throw new Error('Stripe.js failed to load');
  }
  
  stripeInstance = window.Stripe(CONFIG.STRIPE_PUBLISHABLE_KEY);
  console.log('[Stripe] Initialized');
  
  return stripeInstance;
}

/**
 * Create Stripe Elements instance
 * @param {string} clientSecret - PaymentIntent client secret
 * @returns {Promise<{stripe: Stripe, elements: StripeElements}>}
 */
export async function createElements(clientSecret) {
  const stripe = await initializeStripe();
  
  // Create Elements instance with appearance options
  elementsInstance = stripe.elements({
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#00d9ff',
        colorBackground: '#ffffff',
        colorText: '#1a1a2e',
        colorDanger: '#ff4444',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px'
      },
      rules: {
        '.Input': {
          border: '1px solid #e0e0e0',
          boxShadow: 'none'
        },
        '.Input:focus': {
          border: '1px solid #00d9ff',
          boxShadow: '0 0 0 3px rgba(0, 217, 255, 0.2)'
        },
        '.Label': {
          fontWeight: '500'
        }
      }
    }
  });
  
  console.log('[Stripe] Elements created');
  
  return { stripe, elements: elementsInstance };
}

/**
 * Mount Payment Element to DOM
 * @param {StripeElements} elements - Stripe Elements instance
 * @param {string} mountId - DOM element ID to mount to
 * @returns {StripePaymentElement}
 */
export function mountPaymentElement(elements, mountId) {
  const paymentElement = elements.create('payment', {
    layout: {
      type: 'tabs',
      defaultCollapsed: false
    }
  });
  
  const mountElement = document.getElementById(mountId);
  if (!mountElement) {
    throw new Error(`Mount element #${mountId} not found`);
  }
  
  paymentElement.mount(`#${mountId}`);
  console.log('[Stripe] Payment Element mounted');
  
  return paymentElement;
}

/**
 * Confirm payment
 * @param {Stripe} stripe - Stripe instance
 * @param {StripeElements} elements - Stripe Elements instance
 * @param {string} returnUrl - URL to redirect to after payment
 * @returns {Promise<{success: boolean, error?: string, paymentIntent?: Object}>}
 */
export async function confirmPayment(stripe, elements, returnUrl) {
  console.log('[Stripe] Confirming payment...');
  
  const { error, paymentIntent } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: returnUrl
    },
    redirect: 'if_required'
  });
  
  if (error) {
    console.error('[Stripe] Payment error:', error);
    
    // Handle specific error types
    if (error.type === 'card_error' || error.type === 'validation_error') {
      return {
        success: false,
        error: error.message
      };
    }
    
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    };
  }
  
  // Check payment status
  if (paymentIntent) {
    console.log('[Stripe] Payment intent status:', paymentIntent.status);
    
    if (paymentIntent.status === 'succeeded') {
      return {
        success: true,
        paymentIntent
      };
    }
    
    if (paymentIntent.status === 'processing') {
      return {
        success: true,
        paymentIntent
      };
    }
    
    if (paymentIntent.status === 'requires_action') {
      // 3D Secure or other action required
      // Stripe.js handles this automatically
      return {
        success: false,
        error: 'Additional authentication required'
      };
    }
  }
  
  return {
    success: false,
    error: 'Payment was not completed'
  };
}

/**
 * Get payment intent ID from client secret
 * @param {string} clientSecret - The client secret
 * @returns {string} Payment intent ID
 */
export function getPaymentIntentId(clientSecret) {
  // Client secret format: pi_XXXX_secret_YYYY
  return clientSecret.split('_secret_')[0];
}

/**
 * Clean up Stripe instances
 */
export function cleanup() {
  if (elementsInstance) {
    elementsInstance = null;
  }
  console.log('[Stripe] Cleaned up');
}