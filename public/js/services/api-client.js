/**
 * API Client Service
 * Handles all communication with the backend API
 */

import { post, get, ApiError } from '../utils/api.js';

/**
 * Create a payment intent
 * @param {number} femaleQty - Number of female tickets
 * @param {number} maleQty - Number of male tickets
 * @param {string} language - User's language
 * @returns {Promise<{clientSecret: string, paymentIntentId: string, pricing: Object}>}
 * @throws {ApiError} If request fails
 */
export async function createPaymentIntent(femaleQty, maleQty, language) {
  console.log('[API] Creating payment intent:', { femaleQty, maleQty, language });
  
  const response = await post('/api/checkout/create-intent', {
    femaleQty,
    maleQty,
    language
  });
  
  console.log('[API] Payment intent created:', response.paymentIntentId);
  
  return {
    clientSecret: response.clientSecret,
    paymentIntentId: response.paymentIntentId,
    pricing: response.pricing
  };
}

/**
 * Get QR code for an order
 * @param {string} paymentIntentId - The payment intent ID
 * @returns {Promise<{status: string, qrToken?: string, qrImageDataUrl?: string}>}
 * @throws {ApiError} If request fails
 */
export async function getOrderQR(paymentIntentId) {
  console.log('[API] Getting QR code for:', paymentIntentId);
  
  const response = await get(`/api/orders/${paymentIntentId}/qr`);
  
  return {
    status: response.status,
    qrToken: response.qrToken || null,
    qrImageDataUrl: response.qrImageDataUrl || null
  };
}

/**
 * Poll for QR code until ready or timeout
 * @param {string} paymentIntentId - The payment intent ID
 * @param {number} [interval=1500] - Polling interval in ms
 * @param {number} [timeout=60000] - Maximum wait time in ms
 * @returns {Promise<{qrToken: string, qrImageDataUrl: string}>}
 * @throws {Error} If timeout or request fails
 */
export async function pollForQRCode(paymentIntentId, interval = 1500, timeout = 60000) {
  console.log('[API] Starting QR code polling for:', paymentIntentId);
  
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    try {
      const response = await getOrderQR(paymentIntentId);
      
      if (response.status === 'ready') {
        console.log('[API] QR code ready');
        return {
          qrToken: response.qrToken,
          qrImageDataUrl: response.qrImageDataUrl
        };
      }
      
      console.log('[API] QR code pending, waiting...');
      
      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, interval));
      
    } catch (error) {
      console.error('[API] Error polling for QR code:', error);
      
      // If it's a network error, keep trying
      if (error instanceof ApiError && error.status === 0) {
        await new Promise(resolve => setTimeout(resolve, interval));
        continue;
      }
      
      throw error;
    }
  }
  
  throw new Error('QR code retrieval timed out');
}

/**
 * Check API health
 * @returns {Promise<boolean>} True if API is healthy
 */
export async function checkHealth() {
  try {
    const response = await get('/health');
    return response.status === 'ok';
  } catch {
    return false;
  }
}