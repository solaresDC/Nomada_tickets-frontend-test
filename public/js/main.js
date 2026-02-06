/**
 * Main Entry Point
 * Minimal orchestration - page-specific scripts handle their own initialization
 * 
 * This file is included on all pages and handles:
 * - Global error handling
 * - Performance monitoring
 * - Common utilities initialization
 */

// Global error handler
window.addEventListener('error', (event) => {
  console.error('[Global Error]', event.error);
  // In production, you might want to send this to an error tracking service
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('[Unhandled Promise Rejection]', event.reason);
  // In production, you might want to send this to an error tracking service
});

// Log page load performance
window.addEventListener('load', () => {
  if (window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`[Performance] Page load time: ${pageLoadTime}ms`);
  }
});

// Detect if user prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('reduced-motion');
}

console.log('[Main] Application initialized');