# Industrial Premium Visual Redesign — Design Spec

## Overview

A full visual and layout redesign of the Infinite Trade Solutions marketing site (React + Vite), moving from the current navy/amber theme to a sharper, higher-contrast **"Industrial Premium"** direction: charcoal base with a safety-orange accent, unified dark theme across every page.

This is a **visual/layout redesign only** — no changes to product data, copy, business content, or functionality (forms, enquiry submission, filtering logic, routing) unless a layout change requires a structural markup adjustment.

## Goals

- Replace the navy (`#0A1628`) + amber (`#F5A623`) theme with charcoal (`#0D1117`/`#171D26`) + safety-orange (`#FF6B35`).
- Tighten visual language: sharper corners, higher contrast, heavier shadows.
- Unify all pages under one dark theme (no light-background sections).
- Keep existing page structure/section order; apply targeted layout refinements only where they clearly serve the new direction (e.g. an overlapping stats bar under the hero).

## Non-Goals

- No content/copy changes (product listings, testimonials, company bio, credential labels, etc. stay as-is), **except** the one content addition called out below.
- No changes to routing, form validation, enquiry submission logic, or data files (`products.js`, `enquiry.js`).
- Admin page (`/admin`) is out of scope for this redesign.
- No new pages or sections beyond what exists today.
- "IndiaMart Certified" label stays as-is (confirmed — not an error, business is also listed there separately from the TradeIndia profile).

## Content Addition: GST Number

Display the verified GSTIN (`06AAKFI1554M1Z4`) alongside the existing "GST Verified" label in three places:

- **Footer** bottom bar: `GST Verified (06AAKFI1554M1Z4) · IndiaMart Certified · Verified Exporter`
- **About** page, Credentials section: GST Verified card gets the number as a `<small>` line under the title.
- **Contact** page, Industry Credentials sidebar card: GST Verified row gets the number appended.

## Content Correction: Registered Address

The site currently shows `114, Rajeev Nagar, Sector 18, Faridabad – 121002, Haryana, India` (matches the TradeIndia listing), but the GST portal record for GSTIN `06AAKFI1554M1Z4` shows a different registered address. Update every occurrence to the GST-registered address:

`HOUSE NO 2 B BLOCK, VIJAY NAGAR, Faridabad – 121004, Haryana, India`

Occurrences to update: **Contact** page (`address` block + Google Maps embed pin), **Footer** contact list, and the map `<iframe>` query (best-effort — the current embed URL is a placeholder pointing at Sector 18; update the query text to Vijay Nagar, Faridabad, 121004 since an exact verified embed isn't available).

## Design Tokens

Replace the token block in `src/index.css`:

| Token | Old | New |
|---|---|---|
| Page background | `--white: #FFFFFF` | `--bg: #0D1117` |
| Raised surface (cards, bars, footer top) | n/a | `--surface: #171D26` |
| Border/divider | `--gray-300: #D1D5DB` | `--border: #2A323D` |
| Accent | `--amber: #F5A623` | `--accent: #FF6B35` |
| Accent hover/dark | `--amber-dark: #D4891A` | `--accent-dark: #D4551F` |
| Primary text | `--navy: #0A1628` | `--text: #FFFFFF` |
| Secondary/muted text | `--gray-500: #6B7280` | `--text-muted: #9AA5B1` |
| Body copy on dark cards | n/a | `--text-body: #D7DCE2` |
| Radius | `--radius: 6px` | `--radius: 2px` (sharper) |
| Card shadow | `--shadow-card: 0 4px 24px rgba(0,0,0,0.10)` | `0 8px 24px rgba(0,0,0,0.45)` |
| WhatsApp green | `--green: #25D366` | unchanged |
| Heading font | Barlow Condensed, 800 | unchanged |
| Body font | Barlow | unchanged |

Typography stays as-is (Barlow Condensed for headings, uppercase/tight tracking; Barlow for body) — it already reads "industrial" and pairs well with the sharper palette.

## Shared Components

- **Navbar**: dark background (`--bg`), transparent-over-hero → solid-on-scroll behavior unchanged. Logo white, active link + "Get Quote" button in accent orange.
- **Footer**: `--surface` background, thin accent-orange rule above the bottom copyright bar. Content/links unchanged.
- **Buttons**: `.btn-primary` = solid accent orange, dark text. `.btn-outline` = orange or white 1.5px border. Sharp corners (2px radius), uppercase condensed label — same interaction pattern as today, re-skinned.
- **Cards** (product, category, related, testimonial, trust, credential): `--surface` background, 1px `--border`, accent-orange badges/prices, sharp corners. **Dark cards, not light** (validated — keeps everything unified since equipment photos vary widely in tone and a dark unified theme reads more cohesive than light cards popping out).
- **Badges**: NEW = solid orange chip; USED = neutral gray-blue chip (`#5B6472`).

## Page-by-Page Treatment

All five pages keep their current section structure. Below are the deltas from today's implementation.

### Home
- **Hero**: centered/classic composition (validated) — dark gradient background, orange eyebrow label, white headline with orange keyword line, orange primary CTA + white-outline secondary CTA. This is a re-skin of the existing hero, not a structural change.
- **Stats bar**: new detail — bar overlaps the hero's bottom edge (translateY(-14px) card with `--surface` background, thin top border), replacing the flush-below-hero placement today.
- **Categories grid**: darker image overlay gradient for legibility against varied stock photos; orange unit-count tag.
- **Trust section**: icon cards on `--surface`, orange icon accents, same 4-column layout.
- **Testimonials**: dark cards, orange stars, orange avatar initial circle.
- **Recent shipments**: dark row cards, orange accents.
- **CTA banner**: dark-to-charcoal gradient band, orange button.

### Products
- Page hero (breadcrumb + title) on gradient dark background.
- Filters bar: `--surface` background between two `--border` rules; each filter control gets a dark input background (`--bg`) with `--border` outline.
- Product grid: dark cards per the validated component spec, orange badge/price, location pin overlay on the image.

### Product Detail
- Left column: main image + thumbnail strip (active thumbnail gets an orange border), spec table on `--surface`, orange section labels.
- Right column: sticky quote-form card on `--surface`, dark input fields, orange submit button.
- Related equipment: dark cards, same pattern as product grid.

### About
- Hero: same gradient treatment as Products/Contact heroes.
- Legacy split: image block + orange "25+ Years" badge overlapping its corner; mission/vision as two-column orange-labeled blocks.
- CEO section: `--surface` band, orange quote-mark accent on the pull-quote, tag chips on `--bg`.
- Credentials: three dark cards, orange icon accents.
- Timeline: left-border rail (`--border`) with orange year labels, replacing the current left/right zig-zag layout — simpler and reads cleaner on a dark background at this content density.

### Contact
- Hero: same gradient treatment.
- Enquiry form: `--surface` card, dark inputs, orange submit button.
- Sidebar: Direct Channels card (phone/email in orange, WhatsApp button sized full-width to match the card's other elements) + Industry Credentials card, both on `--surface`.
- Map section: `--surface` band, address/hours in muted text, map iframe container gets a dark placeholder frame (`--border`) so it doesn't look like a stray white rectangle before it loads.

## Responsive Behavior

No breakpoint logic changes — existing mobile stacking (single-column grids, hamburger nav, stacked form rows) carries over unchanged; only colors/radii/shadows update at each breakpoint already defined in the `.css` files.

## Implementation Notes

Files touched: `src/index.css` (tokens/global), `src/components/Navbar.css`, `src/components/Footer.css`, `src/components/FloatButtons.css`, `src/components/PageLoader.css`, `src/pages/Home.css`, `src/pages/Products.css`, `src/pages/ProductDetail.css`, `src/pages/About.css`, `src/pages/Contact.css`. Corresponding `.jsx` files only change where markup needs new wrapper elements (e.g. the overlapping stats bar, the timeline rail layout) — data and logic stay untouched.
