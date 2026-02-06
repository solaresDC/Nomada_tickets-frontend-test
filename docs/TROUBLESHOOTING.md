# Troubleshooting Guide

Common issues and their solutions for the Nomada Tickets frontend.

## Development Issues

### Live Server Not Starting

**Symptom:** `npm run dev` fails or nothing happens

**Solutions:**
1. Make sure you're in the `frontend` directory:
```bash
   cd frontend
```

2. Reinstall dependencies:
```bash
   rm -rf node_modules
   npm install
```

3. Check if port 5500 is in use:
   - Close other applications using that port
   - Or change the port in `package.json`

### Page Shows Blank / White Screen

**Symptom:** Page loads but nothing displays

**Solutions:**
1. Open browser Developer Tools (F12)
2. Check the Console tab for errors
3. Common causes:
   - JavaScript syntax error
   - Missing file (404 error)
   - Module import error

### CSS Not Loading

**Symptom:** Page shows unstyled content

**Solutions:**
1. Check that `css/main.css` exists
2. Verify the path in HTML: `href="css/main.css"`
3. Check browser Network tab for 404 errors
4. Clear browser cache (Ctrl+Shift+R)

## API / Backend Issues

### "Network Error" or "Failed to fetch"

**Symptom:** Payment fails with network error

**Solutions:**
1. Verify backend is running:
   - Open `http://localhost:3000/health` in browser
   - Should show `{"status":"ok"}`

2. Check `BACKEND_URL` in `js/config/index.js`:
```javascript
   BACKEND_URL: 'http://localhost:3000'
```

3. Check CORS on backend:
   - Backend must allow requests from `http://localhost:5500`

### "CORS Error"

**Symptom:** Console shows "Access-Control-Allow-Origin" error

**Solutions:**
1. On backend, verify CORS configuration allows your frontend origin
2. For development, backend should allow `http://localhost:5500`
3. For production, update `FRONTEND_ORIGIN` in backend environment

## Stripe Issues

### Payment Element Not Loading

**Symptom:** Payment form shows loading spinner indefinitely

**Solutions:**
1. Check `STRIPE_PUBLISHABLE_KEY` in `js/config/index.js`
2. Verify it starts with `pk_test_` or `pk_live_`
3. Check browser console for Stripe errors
4. Ensure backend returns valid `clientSecret`

### "Invalid API Key"

**Symptom:** Stripe throws API key error

**Solutions:**
1. You're using the wrong key type:
   - Frontend: Publishable key (`pk_test_...`)
   - Backend: Secret key (`sk_test_...`)
2. Never put secret key in frontend code

### Payment Succeeds But No QR Code

**Symptom:** Payment completes but QR polling times out

**Solutions:**
1. Check backend webhook is configured:
   - Stripe CLI running for local dev
   - Webhook endpoint configured in Stripe Dashboard for production

2. Verify webhook secret is correct in backend `.env`

3. Check backend logs for webhook errors

## Language / Translation Issues

### Language Not Switching

**Symptom:** Clicking language options does nothing

**Solutions:**
1. Check browser console for errors
2. Verify localStorage is available:
```javascript
   localStorage.setItem('test', '1');
   localStorage.getItem('test'); // Should return '1'
```
3. Check that translation keys match in `i18n/translations.js`

### Text Shows Key Instead of Translation

**Symptom:** Page shows `home.heroTitle` instead of actual text

**Solutions:**
1. Check the translation key path is correct
2. Verify translation exists in `translations.js`
3. Check for typos in key names

## Mobile / Responsive Issues

### Layout Broken on Mobile

**Symptom:** Elements overlap or look wrong on small screens

**Solutions:**
1. Check viewport meta tag exists:
```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
```
2. Test with browser DevTools mobile emulation
3. Check CSS media queries are loading

### Touch Targets Too Small

**Symptom:** Hard to tap buttons on mobile

**Solutions:**
1. Ensure buttons have minimum 44x44px touch area
2. Check `--touch-target-min` variable in CSS

## Modal Issues

### Modal Not Opening

**Symptom:** Click button but modal doesn't appear

**Solutions:**
1. Check element IDs match between HTML and JavaScript
2. Verify `openModal()` is being called
3. Check for JavaScript errors in console

### Can't Close Modal

**Symptom:** Modal opens but won't close

**Solutions:**
1. Ensure close button calls `closeModal()`
2. Check backdrop click handler is set up
3. Verify modal ID matches in close function

## Browser Compatibility

### Doesn't Work in Safari

**Symptom:** Features broken in Safari/iOS

**Solutions:**
1. Check for unsupported CSS (gap in flexbox for older Safari)
2. Verify ES6 module support
3. Test backdrop-filter with -webkit- prefix

### Internet Explorer Not Supported

This application uses modern JavaScript (ES6 modules) and CSS features that are not supported in Internet Explorer. Please use a modern browser:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Issues

### Page Loads Slowly

**Solutions:**
1. Optimize images:
   - Use WebP format
   - Compress with Squoosh
   - Set explicit width/height

2. Check Network tab for large files

3. Ensure CSS/JS files are minified for production

## Getting More Help

1. Check browser Developer Tools console (F12)
2. Look at Network tab for failed requests
3. Review backend logs for API errors
4. Check Stripe Dashboard for payment issues