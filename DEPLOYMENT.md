# 🚀 Deployment Guide - ADmyBRAND Insights

This guide explains how to deploy the analytics dashboard to popular hosting platforms.

## 📦 Build Process

Before deploying, ensure your project builds successfully:

```bash
npm run build
```

This creates a `dist/` folder with the production-ready files.

## ☁️ Deployment Options

### 1. Vercel (Recommended)

**Option A: Vercel CLI**
```bash
npm install -g vercel
vercel --prod
```

**Option B: GitHub Integration**
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Vite and deploy

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 2. Netlify

**Option A: Netlify CLI**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

**Option B: Drag & Drop**
1. Run `npm run build`
2. Visit [netlify.com](https://netlify.com)
3. Drag the `dist` folder to the deploy area

**Option C: GitHub Integration**
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### 3. GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json` scripts:
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

Deploy:
```bash
npm run build
npm run deploy
```

### 4. Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

Configure `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## 🔧 Environment Configuration

### Base URL Configuration

If deploying to a subdirectory, update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-subdirectory/',
  // ... other config
})
```

### Custom Domain

For custom domains, add a `CNAME` file to the `public/` directory:
```
your-domain.com
```

## 📊 Performance Optimization

### 1. Bundle Analysis
```bash
npm install --save-dev rollup-plugin-visualizer
```

Add to `vite.config.ts`:
```typescript
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ filename: 'dist/stats.html' })
  ]
})
```

### 2. Code Splitting
The current bundle is large due to chart libraries. Consider:

```typescript
// Lazy load chart components
const RevenueChart = lazy(() => import('./components/revenue-chart'))
const UserEngagementChart = lazy(() => import('./components/user-engagement-chart'))
```

### 3. Image Optimization
- Use WebP format for images
- Implement responsive images
- Consider CDN for assets

## 🔒 Security Headers

Add security headers via hosting platform:

**Netlify (_headers file):**
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
```

**Vercel (vercel.json):**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

## 📈 Analytics Integration

### Google Analytics
Add to `index.html`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚨 Troubleshooting

### Common Issues

1. **White screen after deployment**
   - Check base URL configuration
   - Ensure all assets are properly referenced

2. **404 errors on refresh**
   - Configure SPA routing redirects
   - Add `_redirects` file for Netlify or `vercel.json` for Vercel

3. **Large bundle size**
   - Implement code splitting
   - Use dynamic imports for charts
   - Consider alternative chart libraries

### Debug Build Issues
```bash
npm run build -- --debug
npm run preview  # Test production build locally
```

## ✅ Deployment Checklist

- [ ] Project builds successfully (`npm run build`)
- [ ] All images and assets load correctly
- [ ] Dark/light mode toggle works
- [ ] Charts render properly
- [ ] Table sorting and pagination work
- [ ] Export functionality works
- [ ] Responsive design on all devices
- [ ] Performance is acceptable (< 3s load time)
- [ ] Analytics tracking is configured
- [ ] Error boundaries handle failures gracefully

## 🎯 Post-Deployment

1. **Performance Monitoring**
   - Use Lighthouse for performance audits
   - Monitor Core Web Vitals
   - Set up uptime monitoring

2. **User Feedback**
   - Implement feedback collection
   - Monitor user behavior
   - Iterate based on usage patterns

3. **Updates**
   - Set up CI/CD for automatic deployments
   - Implement feature flags for gradual rollouts
   - Monitor error rates after deployments

---

**🚀 Your dashboard is now live and ready to impress!**
