# Industrial Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the entire Infinite Trade Solutions site (Home, Products, Product Detail, About, Contact, shared Navbar/Footer/FloatButtons) from the navy/amber theme to the approved "Industrial Premium" charcoal + safety-orange dark theme, plus two approved content corrections (GST number, registered address).

**Architecture:** This is a CSS re-skin with two intentional structural simplifications (Home stats bar overlap, About timeline rail) — no routing, data, or logic changes. There is no test framework in this project (`package.json` has no `test` script), so verification per task is: `npm run build` succeeds (catches syntax errors) + manual visual check of the running dev server against the specific checkpoints listed in each task, which mirror the approved mockups from `docs/superpowers/specs/2026-07-18-industrial-premium-redesign-design.md`.

**Tech Stack:** React 18 + Vite 5, plain CSS (no CSS-in-JS, no Tailwind), `react-router-dom`, `lucide-react` icons.

## Note: Already Applied

Before task execution began, the founder profile on the About page was corrected ahead of this plan (commit `cf183d5`): CEO section now shows **Pritesh Sharma / Founder** with `/images/pritesh-sharma-portrait.png` instead of Srikant Bhardwaj, and the faint `.ceo-bg` background texture (`/images/srikant-wide.png`) was removed entirely (no wide crop of the new photo was supplied). Task 8 below does not need to redo this — just carry the Industrial Premium color/token changes into the (already name-corrected) CEO section markup.

## Global Constraints

- Token values (exact hex, from the approved spec): page/recessed tone `--navy: #0D1117`, raised surface `--surface: #171D26`, accent `--amber: #FF6B35`, accent-dark `--amber-dark: #D4551F`, border/divider `--gray-100` and `--gray-300` both `#2A323D`, muted text `--gray-500: #9AA5B1`, body-copy text `--gray-700: #D7DCE2`, `--gray-50` becomes an alias of `--navy` (full-bleed section tone). `--white: #FFFFFF` and `--green: #25D366` are unchanged in value; their role stays "text/accent on dark" and "WhatsApp brand color" respectively.
- Radius: `--radius` goes from `6px` to `2px`.
- Shadows: `--shadow-card` becomes `0 8px 24px rgba(0,0,0,0.45)`; `--shadow-heavy` becomes `0 10px 48px rgba(0,0,0,0.55)`.
- No product data, copy, routing, or form-submission logic changes anywhere, **except** the two approved content corrections: (1) GSTIN `06AAKFI1554M1Z4` displayed in Footer, About credentials, Contact credentials; (2) registered address corrected everywhere from `114, Rajeev Nagar, Sector 18, Faridabad – 121002` to `House No 2 B Block, Vijay Nagar, Faridabad – 121004, Haryana, India`.
- `/admin` page is out of scope — do not touch `src/pages/Admin.jsx` or `Admin.css`.
- After every task: run `npm run build` from the repo root and confirm it exits with `✓ built` and no errors before moving to the next task.
- The dev server (`npm run dev`) should be left running throughout — Vite hot-reloads CSS/JSX changes, so each task's visual check can happen immediately without restarting anything.

---

### Task 1: Design tokens + global base

**Files:**
- Modify: `src/index.css:1-31`

**Interfaces:**
- Produces: the token set every other task's CSS relies on (`--navy`, `--surface`, `--amber`, `--amber-dark`, `--white`, `--gray-50`, `--gray-100`, `--gray-300`, `--gray-500`, `--gray-700`, `--green`, `--radius`, `--shadow-card`, `--shadow-heavy`). No task before this one exists; every later task consumes these exact names.

- [ ] **Step 1: Replace the `:root` token block**

Find (lines 1-19 of `src/index.css`):
```css
:root {
  --navy: #0A1628;
  --navy-mid: #1E3A5F;
  --amber: #F5A623;
  --amber-dark: #D4891A;
  --white: #FFFFFF;
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-300: #D1D5DB;
  --gray-500: #6B7280;
  --gray-700: #374151;
  --green: #25D366;
  --font-heading: 'Barlow Condensed', sans-serif;
  --font-body: 'Barlow', sans-serif;
  --shadow-card: 0 4px 24px rgba(0,0,0,0.10);
  --shadow-heavy: 0 8px 40px rgba(0,0,0,0.18);
  --radius: 6px;
  --transition: 0.22s cubic-bezier(.4,0,.2,1);
}
```

Replace with:
```css
:root {
  --navy: #0D1117;
  --surface: #171D26;
  --amber: #FF6B35;
  --amber-dark: #D4551F;
  --white: #FFFFFF;
  --gray-50: var(--navy);
  --gray-100: #2A323D;
  --gray-300: #2A323D;
  --gray-500: #9AA5B1;
  --gray-700: #D7DCE2;
  --green: #25D366;
  --font-heading: 'Barlow Condensed', sans-serif;
  --font-body: 'Barlow', sans-serif;
  --shadow-card: 0 8px 24px rgba(0,0,0,0.45);
  --shadow-heavy: 0 10px 48px rgba(0,0,0,0.55);
  --radius: 2px;
  --transition: 0.22s cubic-bezier(.4,0,.2,1);
}
```

- [ ] **Step 2: Flip the page background/text default**

Find:
```css
body {
  font-family: var(--font-body);
  color: var(--navy);
  background: var(--white);
  -webkit-font-smoothing: antialiased;
  line-height: 1.6;
}
```

Replace with:
```css
body {
  font-family: var(--font-body);
  color: var(--white);
  background: var(--navy);
  -webkit-font-smoothing: antialiased;
  line-height: 1.6;
}
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: `✓ built in ...` with no errors.

- [ ] **Step 4: Visual check**

With `npm run dev` running, open the printed local URL. Expected: the whole site already looks broadly dark/orange (buttons, skip-link, hero overlays) even though no page-specific CSS has been touched yet — this is the token cascade taking effect. Sections that still show light backgrounds are expected until later tasks land (filters bar, cards, etc.).

- [ ] **Step 5: Commit**

```bash
git add src/index.css
git commit -m "Update design tokens to Industrial Premium (charcoal + safety-orange)"
```

---

### Task 2: Navbar re-skin

**Files:**
- Modify: `src/components/Navbar.css:1-16`

**Interfaces:**
- Consumes: tokens from Task 1.

- [ ] **Step 1: Fix the hardcoded transparent-navy value**

Find:
```css
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 900;
  padding: 1rem 0;
  background: rgba(10, 22, 40, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: background 0.35s ease, box-shadow 0.35s ease, padding 0.35s ease;
}
```

Replace with:
```css
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 900;
  padding: 1rem 0;
  background: rgba(13, 17, 23, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: background 0.35s ease, box-shadow 0.35s ease, padding 0.35s ease;
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: `✓ built in ...` with no errors.

- [ ] **Step 3: Visual check**

Open the dev server, scroll the Home page. Expected: navbar background is transparent-dark over the hero, solid charcoal (`--navy`) once scrolled, logo white, active link and "Get Quote" button in safety-orange — matching the `visual-style.html` / `home-hero-layout.html` mockups from the design session.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.css
git commit -m "Re-skin Navbar for Industrial Premium theme"
```

---

### Task 3: Footer re-skin + GST/address content

**Files:**
- Modify: `src/components/Footer.css:1-3`, `:80-83`
- Modify: `src/components/Footer.jsx:10-17`, `:42-44`, `:51-52`

**Interfaces:**
- Consumes: tokens from Task 1.

- [ ] **Step 1: Footer surface background**

Find (`Footer.css`):
```css
.footer {
  background: var(--navy);
  color: rgba(255,255,255,0.7);
  padding-top: 3.5rem;
  margin-top: auto;
}
```

Replace with:
```css
.footer {
  background: var(--surface);
  color: rgba(255,255,255,0.7);
  padding-top: 3.5rem;
  margin-top: auto;
}
```

- [ ] **Step 2: Accent-orange rule above the copyright bar**

Find (`Footer.css`):
```css
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 1rem 0;
}
```

Replace with:
```css
.footer-bottom {
  border-top: 2px solid var(--amber);
  padding: 1rem 0;
}
```

- [ ] **Step 3: Correct the registered address in the footer**

Find (`Footer.jsx`):
```jsx
            <li><MapPin size={14} /> 114, Rajeev Nagar, Sector 18, Faridabad - 121002, Haryana, India</li>
```

Replace with:
```jsx
            <li><MapPin size={14} /> House No 2 B Block, Vijay Nagar, Faridabad - 121004, Haryana, India</li>
```

- [ ] **Step 4: Add the GST number to the bottom bar**

Find (`Footer.jsx`):
```jsx
          <span>GST Verified · IndiaMart Certified · Verified Exporter</span>
```

Replace with:
```jsx
          <span>GST Verified (06AAKFI1554M1Z4) · IndiaMart Certified · Verified Exporter</span>
```

- [ ] **Step 5: Verify the build**

Run: `npm run build`
Expected: `✓ built in ...` with no errors.

- [ ] **Step 6: Visual check**

Scroll to the footer on any page. Expected: footer sits on the lighter charcoal `--surface` tone (visibly distinct from the page background above it), a thin orange rule sits above the copyright line, the copyright line shows the GSTIN, and the contact address list shows the Vijay Nagar address.

- [ ] **Step 7: Commit**

```bash
git add src/components/Footer.css src/components/Footer.jsx
git commit -m "Re-skin Footer and correct GST number / registered address"
```

---

### Task 4: Floating chat widget re-skin

**Files:**
- Modify: `src/components/FloatButtons.css:1-14`, `:55-64`, `:75-85`, `:106-153`

**Interfaces:**
- Consumes: tokens from Task 1.

- [ ] **Step 1: Chatbot popup shell**

Find:
```css
.chatbot {
  position: fixed;
  bottom: 7rem;
  right: 1.5rem;
  width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 12px 48px rgba(0,0,0,0.2);
  z-index: 999;
  overflow: hidden;
  animation: fadeUp 0.25s ease;
  display: flex;
  flex-direction: column;
}
```

Replace with:
```css
.chatbot {
  position: fixed;
  bottom: 7rem;
  right: 1.5rem;
  width: 320px;
  background: var(--surface);
  border-radius: 4px;
  box-shadow: 0 12px 48px rgba(0,0,0,0.5);
  z-index: 999;
  overflow: hidden;
  animation: fadeUp 0.25s ease;
  display: flex;
  flex-direction: column;
}
```

- [ ] **Step 2: Chat bubbles**

Find:
```css
.bot .chat-bubble {
  background: white;
  color: var(--navy);
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}
.user .chat-bubble {
  background: var(--navy);
  color: white;
  border-bottom-right-radius: 4px;
}
```

Replace with:
```css
.bot .chat-bubble {
  background: var(--surface);
  color: var(--white);
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}
.user .chat-bubble {
  background: var(--amber);
  color: var(--navy);
  border-bottom-right-radius: 4px;
}
```

- [ ] **Step 3: Quick-reply chips**

Find:
```css
.chatbot-quick {
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  border-top: 1px solid var(--gray-100);
  background: white;
}
.quick-btn {
  background: var(--gray-100);
  border: none;
  border-radius: 20px;
  font-size: 0.72rem;
  font-family: var(--font-heading);
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--navy);
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  transition: all var(--transition);
}
.quick-btn:hover { background: var(--amber); color: var(--navy); }
```

Replace with:
```css
.chatbot-quick {
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  border-top: 1px solid var(--gray-100);
  background: var(--surface);
}
.quick-btn {
  background: var(--gray-100);
  border: none;
  border-radius: 20px;
  font-size: 0.72rem;
  font-family: var(--font-heading);
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--white);
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  transition: all var(--transition);
}
.quick-btn:hover { background: var(--amber); color: var(--navy); }
```

- [ ] **Step 4: Input row**

Find:
```css
.chatbot-input {
  display: flex;
  border-top: 1px solid var(--gray-100);
  background: white;
}
.chatbot-input input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.75rem 1rem;
  font-size: 0.82rem;
  font-family: var(--font-body);
  background: transparent;
}
```

Replace with:
```css
.chatbot-input {
  display: flex;
  border-top: 1px solid var(--gray-100);
  background: var(--surface);
}
.chatbot-input input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.75rem 1rem;
  font-size: 0.82rem;
  font-family: var(--font-body);
  background: transparent;
  color: var(--white);
}
```

- [ ] **Step 5: Verify the build**

Run: `npm run build`
Expected: `✓ built in ...` with no errors.

- [ ] **Step 6: Visual check**

Open the dev server, click the amber chat float button (bottom-right). Expected: chat popup is a dark charcoal card, bot replies in a slightly lighter dark bubble, your own messages in solid orange with dark text, quick-reply chips and input row all dark — no white flashes anywhere in the widget.

- [ ] **Step 7: Commit**

```bash
git add src/components/FloatButtons.css
git commit -m "Re-skin floating chat widget for Industrial Premium theme"
```

---

### Task 5: Home page re-skin + stats bar overlap

**Files:**
- Modify: `src/pages/Home.css` (multiple rule blocks, listed below)

**Interfaces:**
- Consumes: tokens from Task 1.

- [ ] **Step 1: Darken the hero background gradient**

Find:
```css
.hero-bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.75) 60%, rgba(30,58,95,0.6) 100%),
    url('https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1600') center/cover no-repeat;
  z-index: 0;
}
```

Replace with:
```css
.hero-bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(13,17,23,0.95) 0%, rgba(13,17,23,0.85) 60%, rgba(23,29,38,0.7) 100%),
    url('https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1600') center/cover no-repeat;
  z-index: 0;
}
```

- [ ] **Step 2: Turn the stats bar into an overlapping surface card**

Find:
```css
/* STATS */
.stats-bar {
  background: var(--navy);
  padding: 2.5rem 0;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  text-align: center;
}
.stat-card {}
```

Replace with:
```css
/* STATS */
.stats-bar {
  padding: 0;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  text-align: center;
  background: var(--surface);
  border: 1px solid var(--gray-100);
  border-radius: var(--radius);
  padding: 1.75rem 1rem;
  margin-top: -1.5rem;
  position: relative;
  z-index: 2;
}
.stat-card {}
```

- [ ] **Step 3: Darken the category card overlay gradient**

Find:
```css
.category-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.2) 60%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.25rem;
  transition: background var(--transition);
}
.category-card:hover .category-overlay {
  background: linear-gradient(0deg, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.4) 60%);
}
```

Replace with:
```css
.category-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(13,17,23,0.95) 0%, rgba(13,17,23,0.35) 60%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.25rem;
  transition: background var(--transition);
}
.category-card:hover .category-overlay {
  background: linear-gradient(0deg, rgba(13,17,23,0.97) 0%, rgba(13,17,23,0.55) 60%);
}
```

- [ ] **Step 4: Trust cards to surface tone**

Find:
```css
.trust-card {
  text-align: center;
  padding: 2rem 1.5rem;
  background: white;
  border-radius: var(--radius);
  border: 1px solid var(--gray-100);
  transition: transform var(--transition), box-shadow var(--transition);
}
```

Replace with:
```css
.trust-card {
  text-align: center;
  padding: 2rem 1.5rem;
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid var(--gray-100);
  transition: transform var(--transition), box-shadow var(--transition);
}
```

- [ ] **Step 5: Trust icon accent hex update**

Find:
```css
.trust-icon {
  width: 56px; height: 56px;
  background: rgba(245,166,35,0.1);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--amber);
  margin: 0 auto 1rem;
}
```

Replace with:
```css
.trust-icon {
  width: 56px; height: 56px;
  background: rgba(255,107,53,0.12);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--amber);
  margin: 0 auto 1rem;
}
```

- [ ] **Step 6: Testimonial cards to solid surface tone**

Find:
```css
.testimonial-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--radius);
  padding: 2rem;
  transition: border-color var(--transition);
}
.testimonial-card:hover { border-color: rgba(245,166,35,0.4); }
```

Replace with:
```css
.testimonial-card {
  background: var(--surface);
  border: 1px solid var(--gray-100);
  border-radius: var(--radius);
  padding: 2rem;
  transition: border-color var(--transition);
}
.testimonial-card:hover { border-color: var(--amber); }
```

- [ ] **Step 7: Shipment row cards to surface tone**

Find:
```css
.shipment-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: var(--gray-50);
  border: 1px solid var(--gray-100);
  border-radius: var(--radius);
  transition: all var(--transition);
}
.shipment-card:hover { border-color: var(--amber); background: rgba(245,166,35,0.05); }
.shipment-flag { font-size: 1.5rem; }
.shipment-model { font-family: var(--font-heading); font-weight: 700; font-size: 0.9rem; text-transform: uppercase; }
.shipment-dest { font-size: 0.75rem; color: var(--gray-500); letter-spacing: 0.06em; }
.shipment-arrow { color: var(--gray-300); margin-left: auto; flex-shrink: 0; }
```

Replace with:
```css
.shipment-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--gray-100);
  border-radius: var(--radius);
  transition: all var(--transition);
}
.shipment-card:hover { border-color: var(--amber); background: rgba(255,107,53,0.08); }
.shipment-flag { font-size: 1.5rem; }
.shipment-model { font-family: var(--font-heading); font-weight: 700; font-size: 0.9rem; text-transform: uppercase; }
.shipment-dest { font-size: 0.75rem; color: var(--gray-500); letter-spacing: 0.06em; }
.shipment-arrow { color: var(--gray-500); margin-left: auto; flex-shrink: 0; }
```

- [ ] **Step 8: CTA banner hex updates**

Find:
```css
.cta-content p {
  color: rgba(10,22,40,0.7);
  margin-bottom: 2rem;
  font-size: 1rem;
}
```

Replace with:
```css
.cta-content p {
  color: rgba(13,17,23,0.75);
  margin-bottom: 2rem;
  font-size: 1rem;
}
```

Find:
```css
.cta-btn:hover { background: rgba(10,22,40,0.85); transform: translateY(-2px); }
```

Replace with:
```css
.cta-btn:hover { background: rgba(13,17,23,0.85); transform: translateY(-2px); }
```

- [ ] **Step 9: Verify the build**

Run: `npm run build`
Expected: `✓ built in ...` with no errors.

- [ ] **Step 10: Visual check**

Open the Home page. Expected, top to bottom: dark hero matching the approved "Centered Classic" mockup; the stats row visibly overlaps the bottom edge of the hero as a raised charcoal card; category tiles have a darker legibility gradient; trust/testimonial/shipment cards are all solid dark `--surface` cards with orange accents; CTA banner stays bright orange with dark text. Compare against `home-sections.html` from the design session.

- [ ] **Step 11: Commit**

```bash
git add src/pages/Home.css
git commit -m "Re-skin Home page and add overlapping stats bar"
```

---

### Task 6: Products page re-skin

**Files:**
- Modify: `src/pages/Products.css` (multiple rule blocks, listed below)

**Interfaces:**
- Consumes: tokens from Task 1.

- [ ] **Step 1: Products hero gradient**

Find:
```css
.products-hero {
  background: var(--navy);
  padding: 6rem 0 2.5rem;
}
```

Replace with:
```css
.products-hero {
  background: linear-gradient(160deg, var(--navy) 0%, var(--surface) 100%);
  padding: 6rem 0 2.5rem;
}
```

- [ ] **Step 2: Filters bar to a dark surface band**

Find:
```css
.filters-bar {
  background: white;
  border-bottom: 1px solid var(--gray-100);
  padding: 1.25rem 0;
  position: sticky;
  top: 70px;
  z-index: 100;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
```

Replace with:
```css
.filters-bar {
  background: var(--surface);
  border-top: 1px solid var(--gray-100);
  border-bottom: 1px solid var(--gray-100);
  padding: 1.25rem 0;
  position: sticky;
  top: 70px;
  z-index: 100;
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
}
```

- [ ] **Step 3: Dark search input**

Find:
```css
.search-wrap input {
  width: 100%;
  padding: 0.6rem 0.85rem 0.6rem 0.85rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius);
  font-size: 0.85rem;
  font-family: var(--font-body);
  outline: none;
  transition: border-color var(--transition);
}
.search-wrap input:focus { border-color: var(--navy); }
```

Replace with:
```css
.search-wrap input {
  width: 100%;
  padding: 0.6rem 0.85rem 0.6rem 0.85rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius);
  font-size: 0.85rem;
  font-family: var(--font-body);
  color: var(--white);
  background: var(--navy);
  outline: none;
  transition: border-color var(--transition);
}
.search-wrap input::placeholder { color: var(--gray-500); }
.search-wrap input:focus { border-color: var(--amber); }
```

- [ ] **Step 4: Dark filter selects**

Find:
```css
.filter-group select {
  padding: 0.6rem 0.85rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius);
  font-size: 0.85rem;
  font-family: var(--font-body);
  color: var(--navy);
  outline: none;
  background: white;
  cursor: pointer;
  transition: border-color var(--transition);
  appearance: auto;
}
.filter-group select:focus { border-color: var(--navy); }
```

Replace with:
```css
.filter-group select {
  padding: 0.6rem 0.85rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius);
  font-size: 0.85rem;
  font-family: var(--font-body);
  color: var(--white);
  outline: none;
  background: var(--navy);
  cursor: pointer;
  transition: border-color var(--transition);
  appearance: auto;
}
.filter-group select:focus { border-color: var(--amber); }
```

- [ ] **Step 5: Product card surface + badge + location pin**

Find:
```css
.product-card {
  border: 1px solid var(--gray-100);
  border-radius: var(--radius);
  overflow: hidden;
  background: white;
  transition: transform var(--transition), box-shadow var(--transition);
}
```

Replace with:
```css
.product-card {
  border: 1px solid var(--gray-100);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--surface);
  transition: transform var(--transition), box-shadow var(--transition);
}
```

Find:
```css
.badge-new { background: var(--amber); color: var(--navy); }
.badge-used { background: var(--navy); color: white; }
.card-location {
  position: absolute;
  bottom: 0.75rem; left: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(10,22,40,0.75);
  color: white;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  padding: 0.25rem 0.6rem;
  border-radius: 3px;
}
```

Replace with:
```css
.badge-new { background: var(--amber); color: var(--navy); }
.badge-used { background: #5B6472; color: var(--white); }
.card-location {
  position: absolute;
  bottom: 0.75rem; left: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(13,17,23,0.75);
  color: white;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  padding: 0.25rem 0.6rem;
  border-radius: 3px;
}
```

- [ ] **Step 6: Spec row + card phone hover text color**

Find:
```css
.spec-row span { color: var(--gray-500); }
.spec-row strong { font-weight: 600; color: var(--navy); text-transform: uppercase; font-size: 0.78rem; }
```

Replace with:
```css
.spec-row span { color: var(--gray-500); }
.spec-row strong { font-weight: 600; color: var(--white); text-transform: uppercase; font-size: 0.78rem; }
```

Find:
```css
.card-phone {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  color: var(--gray-500);
  letter-spacing: 0.08em;
  transition: color var(--transition);
}
.card-phone:hover { color: var(--navy); }
```

Replace with:
```css
.card-phone {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  color: var(--gray-500);
  letter-spacing: 0.08em;
  transition: color var(--transition);
}
.card-phone:hover { color: var(--white); }
```

- [ ] **Step 7: Verify the build**

Run: `npm run build`
Expected: `✓ built in ...` with no errors.

- [ ] **Step 8: Visual check**

Open `/products`. Expected: dark gradient page hero, a dark `--surface` filters bar with dark inputs (orange focus ring), and a grid of dark product cards with orange badges/prices — matching `products-page.html` from the design session. Try typing in the search box and changing a filter dropdown to confirm the (unchanged) filtering logic still works.

- [ ] **Step 9: Commit**

```bash
git add src/pages/Products.css
git commit -m "Re-skin Products page filters bar and product cards"
```

---

### Task 7: Product Detail page re-skin

**Files:**
- Modify: `src/pages/ProductDetail.css` (multiple rule blocks, listed below)

**Interfaces:**
- Consumes: tokens from Task 1.

- [ ] **Step 1: Breadcrumb + badge tag hex**

Find:
```css
.breadcrumb span:last-child { color: var(--navy); font-weight: 600; }
```

Replace with:
```css
.breadcrumb span:last-child { color: var(--white); font-weight: 600; }
```

Find:
```css
.badge-tag {
  background: rgba(10,22,40,0.8);
  color: white;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border-radius: 3px;
}
```

Replace with:
```css
.badge-tag {
  background: rgba(13,17,23,0.8);
  color: white;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border-radius: 3px;
}
```

- [ ] **Step 2: Verified-exporter text color**

Find:
```css
.detail-verified { color: var(--navy-mid); font-weight: 600; }
```

Replace with:
```css
.detail-verified { color: var(--amber); font-weight: 600; }
```

- [ ] **Step 3: Specs table to surface card**

Find:
```css
.specs-table {
  background: var(--gray-50);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
}
```

Replace with:
```css
.specs-table {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
}
```

- [ ] **Step 4: Spec cell value + trust badge text color**

Find:
```css
.spec-cell span { color: var(--gray-500); }
.spec-cell strong { font-weight: 600; color: var(--navy); }
```

Replace with:
```css
.spec-cell span { color: var(--gray-500); }
.spec-cell strong { font-weight: 600; color: var(--white); }
```

Find:
```css
.trust-badge-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex: 1;
  padding: 0.85rem 1rem;
  border: 1px solid var(--gray-100);
  border-radius: var(--radius);
  font-size: 0.78rem;
  color: var(--navy);
}
```

Replace with:
```css
.trust-badge-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex: 1;
  padding: 0.85rem 1rem;
  border: 1px solid var(--gray-100);
  border-radius: var(--radius);
  font-size: 0.78rem;
  color: var(--white);
}
```

- [ ] **Step 5: Quote form card to surface + dark inputs**

Find:
```css
.quote-form-card {
  background: var(--navy);
  border-radius: var(--radius);
  padding: 1.75rem;
  color: white;
}
```

Replace with:
```css
.quote-form-card {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 1.75rem;
  color: white;
}
```

Find:
```css
.form-group input, .form-group select, .form-group textarea {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 4px;
  color: white;
  font-family: var(--font-body);
  font-size: 0.85rem;
  padding: 0.6rem 0.75rem;
  outline: none;
  transition: border-color var(--transition);
  width: 100%;
  resize: vertical;
}
```

Replace with:
```css
.form-group input, .form-group select, .form-group textarea {
  background: var(--navy);
  border: 1px solid var(--gray-100);
  border-radius: 4px;
  color: white;
  font-family: var(--font-body);
  font-size: 0.85rem;
  padding: 0.6rem 0.75rem;
  outline: none;
  transition: border-color var(--transition);
  width: 100%;
  resize: vertical;
}
```

- [ ] **Step 6: Related cards to surface + outline button re-skin**

Find:
```css
.related-card {
  border: 1px solid var(--gray-100);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform var(--transition), box-shadow var(--transition);
  display: block;
}
```

Replace with:
```css
.related-card {
  border: 1px solid var(--gray-100);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--surface);
  transition: transform var(--transition), box-shadow var(--transition);
  display: block;
}
```

Find:
```css
.btn-outline-dark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid var(--navy);
  background: none;
  color: var(--navy);
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.55rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--transition);
}
.btn-outline-dark:hover { background: var(--navy); color: white; }
```

Replace with:
```css
.btn-outline-dark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid var(--amber);
  background: none;
  color: var(--amber);
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.55rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--transition);
}
.btn-outline-dark:hover { background: var(--amber); color: var(--navy); }
```

- [ ] **Step 7: Verify the build**

Run: `npm run build`
Expected: `✓ built in ...` with no errors.

- [ ] **Step 8: Visual check**

Open any `/products/:id` page (e.g. `/products/1`). Expected: spec table and quote-form both read as distinct dark surface cards against the page background, thumbnail active-state border is orange, related-equipment cards below are dark with an orange outline "View Details" button — matching `product-detail-page.html` from the design session. Submit the quote form with valid data and confirm the existing success state still renders (functionality unchanged).

- [ ] **Step 9: Commit**

```bash
git add src/pages/ProductDetail.css
git commit -m "Re-skin Product Detail page"
```

---

### Task 8: About page re-skin + timeline simplification + GST content

**Files:**
- Modify: `src/pages/About.css` (multiple rule blocks, listed below)
- Modify: `src/pages/About.jsx:87-98`

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: `credentials` array items gain an optional `sub` field rendered as `<small>` — no other task depends on this.

- [ ] **Step 1: About hero gradient**

Find:
```css
.about-hero-bg {
  position: absolute; inset: 0;
  background:
    linear-gradient(135deg, rgba(10,22,40,0.93) 0%, rgba(10,22,40,0.7) 60%),
    url('https://images.pexels.com/photos/2252060/pexels-photo-2252060.jpeg?auto=compress&cs=tinysrgb&w=1600') center/cover no-repeat;
  z-index: 0;
}
```

Replace with:
```css
.about-hero-bg {
  position: absolute; inset: 0;
  background:
    linear-gradient(135deg, rgba(13,17,23,0.95) 0%, rgba(13,17,23,0.8) 60%),
    url('https://images.pexels.com/photos/2252060/pexels-photo-2252060.jpeg?auto=compress&cs=tinysrgb&w=1600') center/cover no-repeat;
  z-index: 0;
}
```

- [ ] **Step 2: Credential cards to surface tone + icon hex**

Find:
```css
.credential-card {
  text-align: center;
  padding: 2.5rem 1.5rem;
  background: white;
  border-radius: var(--radius);
  border: 1px solid var(--gray-100);
  transition: transform var(--transition), box-shadow var(--transition);
}
.credential-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-card); }
.cred-icon {
  width: 56px; height: 56px;
  background: rgba(245,166,35,0.1);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--amber); margin: 0 auto 1rem;
}
```

Replace with:
```css
.credential-card {
  text-align: center;
  padding: 2.5rem 1.5rem;
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid var(--gray-100);
  transition: transform var(--transition), box-shadow var(--transition);
}
.credential-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-card); }
.cred-icon {
  width: 56px; height: 56px;
  background: rgba(255,107,53,0.12);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--amber); margin: 0 auto 1rem;
}
```

- [ ] **Step 3: Add a `small` style for the GST number line**

Find:
```css
.credential-card h4 {
  font-size: 0.9rem; letter-spacing: 0.08em;
  text-transform: uppercase; margin-bottom: 0.5rem;
}
.credential-card p { font-size: 0.83rem; color: var(--gray-500); line-height: 1.6; }
```

Replace with:
```css
.credential-card h4 {
  font-size: 0.9rem; letter-spacing: 0.08em;
  text-transform: uppercase; margin-bottom: 0.5rem;
}
.credential-card p { font-size: 0.83rem; color: var(--gray-500); line-height: 1.6; }
.credential-card small { display: block; margin-top: 0.5rem; font-size: 0.72rem; color: var(--amber); letter-spacing: 0.05em; }
```

- [ ] **Step 4: Simplify the timeline to a single left rail**

Find:
```css
/* TIMELINE */
.timeline-section { padding: 5rem 0; }
.timeline-section h2 { font-size: 2rem; text-transform: uppercase; margin-bottom: 3rem; }
.timeline { display: flex; flex-direction: column; gap: 0; position: relative; }
.timeline::before {
  content: '';
  position: absolute;
  left: 50%; top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--amber), var(--navy-mid), var(--amber));
  transform: translateX(-50%);
}
.timeline-item {
  display: grid;
  grid-template-columns: 1fr 32px 1fr;
  gap: 2rem;
  align-items: center;
  padding: 2rem 0;
  position: relative;
}
.timeline-item.right .timeline-content { grid-column: 3; grid-row: 1; }
.timeline-item.right .timeline-image { grid-column: 1; grid-row: 1; }
.timeline-item.right .timeline-dot { grid-column: 2; }
.timeline-dot {
  width: 16px; height: 16px;
  background: var(--amber);
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 0 3px var(--amber);
  justify-self: center;
  z-index: 1;
}
```

Replace with:
```css
/* TIMELINE */
.timeline-section { padding: 5rem 0; }
.timeline-section h2 { font-size: 2rem; text-transform: uppercase; margin-bottom: 3rem; }
.timeline { display: flex; flex-direction: column; gap: 0; position: relative; }
.timeline::before {
  content: '';
  position: absolute;
  left: 16px; top: 0; bottom: 0;
  width: 2px;
  background: var(--gray-100);
}
.timeline-item {
  display: grid;
  grid-template-columns: 32px 1fr;
  grid-template-rows: auto auto;
  gap: 0.5rem 1.5rem;
  align-items: start;
  padding: 2rem 0;
  position: relative;
}
.timeline-item .timeline-content { grid-column: 2; grid-row: 1; }
.timeline-item .timeline-image { grid-column: 2; grid-row: 2; }
.timeline-item .timeline-dot { grid-column: 1; grid-row: 1; }
.timeline-dot {
  width: 16px; height: 16px;
  background: var(--amber);
  border-radius: 50%;
  border: 3px solid var(--navy);
  box-shadow: 0 0 0 3px var(--amber);
  justify-self: center;
  margin-top: 4px;
  z-index: 1;
}
```

- [ ] **Step 5: Remove the now-redundant mobile timeline override**

Find (inside the `@media (max-width: 900px)` block):
```css
  .timeline::before { left: 24px; }
  .timeline-item { grid-template-columns: 32px 1fr; }
  .timeline-item.left .timeline-content,
  .timeline-item.right .timeline-content { grid-column: 2; grid-row: 1; }
  .timeline-item.left .timeline-image,
  .timeline-item.right .timeline-image { grid-column: 2; grid-row: 2; }
  .timeline-item.left .timeline-dot,
  .timeline-item.right .timeline-dot { grid-column: 1; grid-row: 1; }
```

Replace with: *(delete these lines entirely — the base `.timeline-item` rule from Step 4 already applies this layout at every width)*

- [ ] **Step 6: CEO image label gradient hex**

Find:
```css
.ceo-image-label {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: linear-gradient(0deg, rgba(10,22,40,0.92) 0%, transparent 100%);
  padding: 2rem 1.25rem 1.25rem;
  border-radius: 0 0 var(--radius) var(--radius);
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
```

Replace with:
```css
.ceo-image-label {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: linear-gradient(0deg, rgba(13,17,23,0.95) 0%, transparent 100%);
  padding: 2rem 1.25rem 1.25rem;
  border-radius: 0 0 var(--radius) var(--radius);
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
```

- [ ] **Step 7: Add the GST number to the About credentials data**

Find (`About.jsx`):
```jsx
              {[
                { icon: <Globe size={24} />, title: "Verified Exporter", desc: "Global trade compliance and export certification for 50+ countries." },
                { icon: <Shield size={24} />, title: "IndiaMart Certified", desc: "Top ranking for reliability and excellence on India's largest B2B platform." },
                { icon: <CheckCircle size={24} />, title: "GST Verified", desc: "Fully transparent tax and legal compliance in all domestic operations." }
              ].map(c => (
                <div key={c.title} className="credential-card">
                  <div className="cred-icon">{c.icon}</div>
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </div>
              ))}
```

Replace with:
```jsx
              {[
                { icon: <Globe size={24} />, title: "Verified Exporter", desc: "Global trade compliance and export certification for 50+ countries." },
                { icon: <Shield size={24} />, title: "IndiaMart Certified", desc: "Top ranking for reliability and excellence on India's largest B2B platform." },
                { icon: <CheckCircle size={24} />, title: "GST Verified", desc: "Fully transparent tax and legal compliance in all domestic operations.", sub: "GSTIN: 06AAKFI1554M1Z4" }
              ].map(c => (
                <div key={c.title} className="credential-card">
                  <div className="cred-icon">{c.icon}</div>
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                  {c.sub && <small>{c.sub}</small>}
                </div>
              ))}
```

- [ ] **Step 8: Verify the build**

Run: `npm run build`
Expected: `✓ built in ...` with no errors.

- [ ] **Step 9: Visual check**

Open `/about`. Expected: hero/CEO/credentials sections read as dark surface cards on the page background (matching `about-page.html` from the design session); the "GST Verified" card shows the GSTIN under its description; the timeline no longer zig-zags left/right — every entry has its year/title/description to the right of a single left-hand dot-and-rail, at both desktop and narrow widths (resize the browser or use DevTools device toolbar to confirm both).

- [ ] **Step 10: Commit**

```bash
git add src/pages/About.css src/pages/About.jsx
git commit -m "Re-skin About page, simplify timeline to a left rail, add GST number"
```

---

### Task 9: Contact page re-skin + address/GST content

**Files:**
- Modify: `src/pages/Contact.css` (multiple rule blocks, listed below)
- Modify: `src/pages/Contact.jsx:160-167`, `:149`, `:176-186`

**Interfaces:**
- Consumes: tokens from Task 1.

- [ ] **Step 1: Contact hero gradient**

Find:
```css
.contact-hero-bg {
  position: absolute; inset: 0;
  background:
    linear-gradient(135deg, rgba(10,22,40,0.88) 0%, rgba(10,22,40,0.65) 70%),
    url('https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=1600') center/cover no-repeat;
  z-index: 0;
}
```

Replace with:
```css
.contact-hero-bg {
  position: absolute; inset: 0;
  background:
    linear-gradient(135deg, rgba(13,17,23,0.95) 0%, rgba(13,17,23,0.8) 70%),
    url('https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=1600') center/cover no-repeat;
  z-index: 0;
}
```

- [ ] **Step 2: Give the enquiry form its own surface card**

Find:
```css
.contact-form-wrap h2 {
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 1.75rem;
}
```

Replace with:
```css
.contact-form-wrap {
  background: var(--surface);
  border: 1px solid var(--gray-100);
  border-radius: var(--radius);
  padding: 1.75rem;
}
.contact-form-wrap h2 {
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 1.75rem;
}
```

- [ ] **Step 3: Dark form fields**

Find:
```css
.form-group input,
.form-group select,
.form-group textarea {
  border: 1px solid var(--gray-300);
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--navy);
  padding: 0.7rem 0.9rem;
  outline: none;
  background: white;
  transition: border-color var(--transition);
  width: 100%;
  resize: vertical;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus { border-color: var(--navy); }
.form-group input::placeholder, .form-group textarea::placeholder { color: var(--gray-300); }
```

Replace with:
```css
.form-group input,
.form-group select,
.form-group textarea {
  border: 1px solid var(--gray-100);
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--white);
  padding: 0.7rem 0.9rem;
  outline: none;
  background: var(--navy);
  transition: border-color var(--transition);
  width: 100%;
  resize: vertical;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus { border-color: var(--amber); }
.form-group input::placeholder, .form-group textarea::placeholder { color: var(--gray-500); }
```

- [ ] **Step 4: Phone-code prefix + success box + reset button**

Find:
```css
.phone-code {
  background: var(--gray-100);
  border: 1px solid var(--gray-300);
  border-right: none;
  border-radius: var(--radius) 0 0 var(--radius);
  padding: 0.7rem 0.75rem;
  font-size: 0.88rem;
  color: var(--gray-700);
  font-weight: 600;
  white-space: nowrap;
}
```

Replace with:
```css
.phone-code {
  background: var(--navy);
  border: 1px solid var(--gray-100);
  border-right: none;
  border-radius: var(--radius) 0 0 var(--radius);
  padding: 0.7rem 0.75rem;
  font-size: 0.88rem;
  color: var(--gray-700);
  font-weight: 600;
  white-space: nowrap;
}
```

Find:
```css
.success-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 2rem;
  background: var(--gray-50);
  border-radius: var(--radius);
  gap: 0.5rem;
}
```

Replace with:
```css
.success-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 2rem;
  background: var(--surface);
  border-radius: var(--radius);
  gap: 0.5rem;
}
```

Find:
```css
.reset-btn:hover { border-color: var(--navy); color: var(--navy); }
```

Replace with:
```css
.reset-btn:hover { border-color: var(--amber); color: var(--amber); }
```

- [ ] **Step 5: Sidebar cards to surface tone**

Find:
```css
.direct-channels, .industry-creds {
  background: var(--navy);
  border-radius: var(--radius);
  padding: 1.75rem;
  color: white;
}
```

Replace with:
```css
.direct-channels, .industry-creds {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 1.75rem;
  color: white;
}
```

- [ ] **Step 6: Map section text colors + embed placeholder tone**

Find:
```css
.map-info address {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  font-style: normal;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1rem;
  color: var(--navy);
}
```

Replace with:
```css
.map-info address {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  font-style: normal;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1rem;
  color: var(--white);
}
```

Find:
```css
.map-details strong { font-family: var(--font-heading); font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--navy); }
```

Replace with:
```css
.map-details strong { font-family: var(--font-heading); font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--white); }
```

Find:
```css
.map-embed {
  height: 420px;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-heavy);
  border: 1px solid var(--gray-100);
}
```

Replace with:
```css
.map-embed {
  height: 420px;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-heavy);
  border: 1px solid var(--gray-100);
  background: var(--surface);
}
```

- [ ] **Step 7: Correct the registered address**

Find (`Contact.jsx`):
```jsx
              <address>
                <MapPin size={18} />
                <div>
                  114, Rajeev Nagar, Sector 18,<br />
                  Faridabad – 121002,<br />
                  Haryana, India
                </div>
              </address>
```

Replace with:
```jsx
              <address>
                <MapPin size={18} />
                <div>
                  House No 2 B Block, Vijay Nagar,<br />
                  Faridabad – 121004,<br />
                  Haryana, India
                </div>
              </address>
```

- [ ] **Step 8: Add the GST number to Industry Credentials**

Find (`Contact.jsx`):
```jsx
                <div className="cred-row"><CheckCircle size={16} /> <span><strong>GST Verified</strong><small>Fully compliant since 2017</small></span></div>
```

Replace with:
```jsx
                <div className="cred-row"><CheckCircle size={16} /> <span><strong>GST Verified</strong><small>GSTIN 06AAKFI1554M1Z4 · Compliant since 2017</small></span></div>
```

- [ ] **Step 9: Update the map embed title and query to Vijay Nagar**

Find (`Contact.jsx`):
```jsx
              <iframe
                title="Infinite Trade Solutions Location - Faridabad, Haryana"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.1234567890!2d77.3103!3d28.4089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd6a7b8f1234%3A0xabcdef1234567890!2sSector+18%2C+Faridabad%2C+Haryana+121002!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
```

Replace with:
```jsx
              <iframe
                title="Infinite Trade Solutions Location - Vijay Nagar, Faridabad, Haryana"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.1234567890!2d77.3103!3d28.4089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd6a7b8f1234%3A0xabcdef1234567890!2sVijay+Nagar%2C+Faridabad%2C+Haryana+121004!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
```

- [ ] **Step 10: Verify the build**

Run: `npm run build`
Expected: `✓ built in ...` with no errors.

- [ ] **Step 11: Visual check**

Open `/contact`. Expected: enquiry form now sits inside a dark surface card with dark inputs, sidebar "Direct Channels"/"Industry Credentials" cards are dark surface tone, GST row shows the GSTIN, address block (and footer, from Task 3) shows Vijay Nagar/121004, map iframe area has a dark placeholder instead of a white flash before it loads — matching `contact-page.html` from the design session. Submit the form with valid data and confirm the existing success state still renders.

- [ ] **Step 12: Commit**

```bash
git add src/pages/Contact.css src/pages/Contact.jsx
git commit -m "Re-skin Contact page and correct GST number / registered address"
```

---

### Task 10: Full-site smoke test

**Files:** none (verification only)

**Interfaces:** none — this task only confirms Tasks 1–9 compose correctly across the whole site.

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: `✓ built in ...` with no errors, and a `dist/` folder is produced.

- [ ] **Step 2: Click through every page on desktop width**

With `npm run dev` running, visit `/`, `/products`, `/products/1`, `/about`, `/contact` in order. Expected: no page shows a light/white background anywhere (no flash of the old theme), navbar/footer read consistently dark+orange on every page, all interactive elements (filters, forms, WhatsApp/chat float buttons) still function as before.

- [ ] **Step 3: Mobile-width check**

Open DevTools device toolbar (Ctrl+Shift+M / Cmd+Shift+M) at a 375px-wide preset (e.g. iPhone SE) and repeat Step 2. Expected: hamburger nav opens/closes correctly with the new dark styling, stacked single-column layouts (product grid, timeline, form rows) all read correctly with no light-background regressions, the About timeline (Task 8) shows the same left-rail layout as desktop.

- [ ] **Step 4: Confirm the two content corrections everywhere they appear**

Check: Footer bottom bar and Contact sidebar both show `GSTIN 06AAKFI1554M1Z4` (or `GST Verified (06AAKFI1554M1Z4)` in the footer's case); About page's GST Verified card shows the same GSTIN; Footer contact list, Contact page address block, and Contact page map embed title all show `Vijay Nagar ... 121004` — not the old `Rajeev Nagar, Sector 18 ... 121002`.

- [ ] **Step 5: Final commit (only if Step 2–4 surfaced fixes)**

If any visual check above required a small fix, stage exactly those files and commit with a message describing the fix, e.g.:

```bash
git add <fixed files>
git commit -m "Fix smoke-test regression: <short description>"
```

If nothing needed fixing, skip this step — Tasks 1–9's commits already capture the complete redesign.
