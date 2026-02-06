/**
 * API Utility Functions
 * Fetch helpers with error handling and response parsing
 */

import { getApiUrl } from '../config/index.js';

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Default fetch options
 */
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Handle API response
 * @param {Response} response - Fetch response
 * @returns {Promise<*>} Parsed response data
 * @throws {ApiError} If response is not ok
 */
async function handleResponse(response) {
  let data;
  
  // Try to parse JSON response
  try {
    data = await response.json();
  } catch {
    data = null;
  }
  
  if (!response.ok) {
    const message = data?.error || data?.message || `HTTP error ${response.status}`;
    throw new ApiError(message, response.status, data);
  }
  
  return data;
}

/**
 * Make a GET request
 * @param {string} endpoint - API endpoint
 * @param {Object} [options] - Additional fetch options
 * @returns {Promise<*>} Response data
 */
export async function get(endpoint, options = {}) {
  const url = getApiUrl(endpoint);
  
  try {
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      method: 'GET',
    });
    
    return await handleResponse(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network error or other fetch failure
    throw new ApiError(
      error.message || 'Network error. Please check your connection.',
      0
    );
  }
}

/**
 * Make a POST request
 * @param {string} endpoint - API endpoint
 * @param {Object} body - Request body
 * @param {Object} [options] - Additional fetch options
 * @returns {Promise<*>} Response data
 */
export async function post(endpoint, body, options = {}) {
  const url = getApiUrl(endpoint);
  
  try {
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
    
    return await handleResponse(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network error or other fetch failure
    throw new ApiError(
      error.message || 'Network error. Please check your connection.',
      0
    );
  }
}

/**
 * Make a request with retry logic
 * @param {Function} requestFn - Async function that makes the request
 * @param {number} [maxRetries=3] - Maximum number of retries
 * @param {number} [delay=1000] - Delay between retries in ms
 * @returns {Promise<*>} Response data
 */
export async function withRetry(requestFn, maxRetries = 3, delay = 1000) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors (4xx)
      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        throw error;
      }
      
      // Wait before retrying (except on last attempt)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }
  
  throw lastError;
}