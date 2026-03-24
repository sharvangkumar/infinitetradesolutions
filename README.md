# Infinite Trade Solutions — Website

React + Vite frontend for Infinite Trade Solutions, Faridabad.

---

## 🚀 Quick Start (Local Dev)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys (see below)

# 3. Start dev server
npm run dev
# → Opens at http://localhost:5173
```

---

## 📬 WHERE ENQUIRIES GO

Every form submission (Contact page + Product detail pages) does **3 things simultaneously**:

### 1. ✅ localStorage (Always works — zero setup)
All enquiries are saved instantly to the user's browser.
To view them, open browser DevTools → Application → Local Storage → `its_enquiries`

### 2. 📧 Email via EmailJS (Free: 200/month)
You receive an email for every enquiry.

**Setup (5 minutes):**
1. Go to [emailjs.com](https://www.emailjs.com) → Sign up free
2. **Add a Service**: Connect your Gmail (`info@infinitetrade.com`)
3. **Create a Template**:
   - Subject: `New Enquiry from {{from_name}} ({{country}})`
   - Body:
     ```
     Product Enquired: {{product}}
     Name: {{from_name}}
     Email: {{from_email}}
     Phone: {{phone}}
     Country: {{country}}
     
     Message:
     {{message}}
     ```
4. Copy your **Service ID**, **Template ID**, and **Public Key**
5. Add to `.env.local`:
   ```
   VITE_EMAILJS_SERVICE_ID=service_abc123
   VITE_EMAILJS_TEMPLATE_ID=template_xyz789
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

### 3. 📊 Google Sheets (Free, unlimited rows)
Every enquiry is logged as a row in a Google Sheet — perfect for tracking leads.

**Setup (10 minutes):**
1. Create a new [Google Sheet](https://sheets.google.com)
   - Name it: `ITS Enquiries`
   - Add a tab named: `Enquiries`
2. Go to **Extensions → Apps Script**
3. Delete all existing code, paste the entire content of `docs/google-apps-script.js`
4. Click **Save** → **Deploy** → **New Deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy** → Copy the **Web App URL**
6. Add to `.env.local`:
   ```
   VITE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_ID/exec
   ```

Your sheet will auto-create headers and log every enquiry with timestamp.

---

## 🌐 DEPLOYMENT

### Option A — Vercel (Recommended, Free)
**Fastest: 2 minutes, automatic HTTPS, custom domain support**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (first time — follow prompts)
vercel

# Deploy to production
vercel --prod
```

Or via Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. **Import Project** → Upload or connect your GitHub repo
3. Framework: **Vite** (auto-detected)
4. Add Environment Variables (from your `.env.local`)
5. Click **Deploy** → done ✅

**Add custom domain**: Vercel Dashboard → Project → Settings → Domains → Add `infinitetradesolutions.com`

---

### Option B — Netlify (Also Free)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --dir=dist          # preview
netlify deploy --dir=dist --prod   # production
```

Or drag-and-drop: Build with `npm run build`, then drag the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

---

### Option C — cPanel / Shared Hosting (Your hosting provider)

```bash
# Build locally
npm run build

# Upload the contents of dist/ to your hosting:
# → public_html/ (or www/ or httpdocs/)
# Using FTP (FileZilla) or cPanel File Manager
```

Files to upload from `dist/`:
```
dist/
├── index.html        ← upload this
├── assets/           ← upload this entire folder
│   ├── index-xxx.js
│   └── index-xxx.css
```

⚠️ Also upload `.htaccess` for Apache servers (React Router needs it):
Create a file called `.htaccess` in `public_html/` with:
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QR,L]
```

---

### Option D — GitHub Pages (Free)

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

npm run deploy
```

Add `"base": "/repo-name/"` to `vite.config.js` if using a repo subdirectory.

---

## 🔧 Environment Variables for Deployment

When deploying to Vercel/Netlify, add these in their dashboard (not in code):

| Variable | Where to get it |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS dashboard |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS dashboard |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS dashboard |
| `VITE_SHEETS_WEBHOOK_URL` | Google Apps Script deployment |

---

## 📁 Project Structure

```
src/
├── App.jsx                    # Routes
├── main.jsx                   # Entry point
├── index.css                  # Design tokens
├── services/
│   └── enquiry.js             # Enquiry handling (localStorage + email + sheets)
├── data/
│   └── products.js            # All product data
├── components/
│   ├── Navbar.jsx/css
│   ├── Footer.jsx/css
│   └── FloatButtons.jsx/css   # WhatsApp + chatbot
└── pages/
    ├── Home.jsx/css
    ├── Products.jsx/css
    ├── ProductDetail.jsx/css
    ├── About.jsx/css
    └── Contact.jsx/css
docs/
└── google-apps-script.js      # Paste into Google Apps Script
```

---

## 🏗️ Build for Production

```bash
npm run build
# Output: dist/ folder (ready to deploy)
```

Build stats: ~238KB JS (gzipped: 75KB) · 40KB CSS (gzipped: 7KB)
