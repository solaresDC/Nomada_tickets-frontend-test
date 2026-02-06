# Deployment Guide - Cloudflare Pages

This guide walks you through deploying the Nomada Tickets frontend to Cloudflare Pages.

## Prerequisites

1. A GitHub account with the repository pushed
2. A Cloudflare account (free tier works)
3. Backend API deployed and accessible

## Step 1: Push to GitHub

If you haven't already, push your code to GitHub:
```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial frontend commit"

# Add remote (replace with your repo)
git remote add origin https://github.com/yourusername/nomada-tickets.git

# Push
git branch -M main
git push -u origin main
```

## Step 2: Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Pages** in the sidebar
3. Click **Create a project**
4. Click **Connect to Git**
5. Select your GitHub account and repository
6. Click **Begin setup**

## Step 3: Configure Build Settings

Use these settings:

| Setting | Value |
|---------|-------|
| Project name | `nomada-tickets` |
| Production branch | `main` |
| Framework preset | None |
| Build command | (leave empty) |
| Build output directory | `frontend/public` |
| Root directory | `/` |

## Step 4: Environment Variables (Optional)

If you need environment variables:

1. Go to **Settings** → **Environment variables**
2. Add any variables needed
3. Note: Frontend config is in `public/js/config/index.js`

## Step 5: Deploy

1. Click **Save and Deploy**
2. Wait for the build to complete (usually 1-2 minutes)
3. Your site will be available at `your-project.pages.dev`

## Step 6: Custom Domain (Optional)

1. Go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `nomadatickets.com`)
4. Follow the DNS instructions

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test language switching
- [ ] Test ticket selection flow
- [ ] Test payment flow (use Stripe test cards)
- [ ] Verify QR code displays after payment
- [ ] Check mobile responsiveness
- [ ] Test on different browsers

## Automatic Deployments

Cloudflare Pages automatically deploys when you push to the `main` branch.

For preview deployments on other branches, enable in project settings.

## Troubleshooting

### Build Fails
- Ensure `frontend/public` directory exists
- Check for syntax errors in HTML/CSS/JS

### API Errors
- Verify `BACKEND_URL` in `config/index.js` is correct
- Check CORS settings on backend allow your Cloudflare domain

### Stripe Not Loading
- Verify `STRIPE_PUBLISHABLE_KEY` is correct
- Check browser console for errors