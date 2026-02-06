/**
 * Application Configuration
 * Central configuration for API URLs, Stripe keys, and app settings
 * 
 * IMPORTANT: 
 * - BACKEND_URL should be updated for production
 * - STRIPE_PUBLISHABLE_KEY is safe to include in frontend (it's public)
 * - NEVER include STRIPE_SECRET_KEY here (backend only)
 */

export const CONFIG = {
  // API Configuration
  // Change this to your production backend URL when deploying
  BACKEND_URL: 'https://nomada-tickets-com-test.onrender.com',
  
  // Stripe Configuration
  // This is the PUBLISHABLE key - safe for frontend
  // Get this from: https://dashboard.stripe.com/test/apikeys
  STRIPE_PUBLISHABLE_KEY: 'pk_test_51SpBLCGdj6SAdp6oLGJ8zP5Kzhym1brfJlLQWTh1NtkOIWAHCNRrvEsvK5pZK4hakojlZTPefy70w8lC1GTWZQb500LMybWaK6',
  
  // App Settings
  APP_NAME: 'Nomada Tickets',
  DEFAULT_LANGUAGE: 'en',
  SUPPORTED_LANGUAGES: ['en', 'es', 'pt-BR'],
  
  // Polling Configuration (for QR code retrieval)
  QR_POLL_INTERVAL: 1500,    // 1.5 seconds between polls
  QR_POLL_TIMEOUT: 60000,    // 60 seconds max wait time
  
  // Ticket Pricing (display only - actual calculation on backend)
  PRICING: {
    FEMALE_TICKET: 1.00,     // CAD
    MALE_TICKET: 2.00,       // CAD
    FEE_PERCENTAGE: 0.08,    // 8%
    CURRENCY: 'CAD'
  },
  
  // Validation Limits
  VALIDATION: {
    MAX_QUANTITY: 10,
    MIN_QUANTITY: 0
  }
};

/**
 * Get the full API URL for an endpoint
 * @param {string} endpoint - The API endpoint (e.g., '/api/checkout/create-intent')
 * @returns {string} The full URL
 */
export function getApiUrl(endpoint) {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${CONFIG.BACKEND_URL}${cleanEndpoint}`;
}

/**
 * Check if we're in development mode
 * @returns {boolean}
 */
export function isDevelopment() {
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1';
}

// Freeze config to prevent accidental modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.PRICING);
Object.freeze(CONFIG.VALIDATION);