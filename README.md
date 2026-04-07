# voy · Customer Portal Prototype

A static HTML prototype for the voy customer-facing plan management experience. Built to explore and iterate on UX patterns for subscription management, add-ons, and billing flows.

## Pages

| Page | Route | Description |
|---|---|---|
| **Manage plan** | `index.html` | Main plan overview — hero card, deliveries, treatment support, and about your treatment sections |
| **Billing frequency** | `offers.html` | Switch billing commitment — monthly, quarterly, or annual. Highlights current plan and cost implications of switching |
| **Manage add-on** | `addon.html` | Individual add-on subscription — details, current order, next delivery, and cancel |
| **Move date** | `move-date.html` | Calendar modal for moving a delivery or billing date (`?type=delivery` or `?type=billing`) |
| **Explore** | `browse-addons.html` | Catalogue for browsing and adding treatment support products |

## Brand colours

| Token | Hex | Usage |
|---|---|---|
| Olive | `#19301E` | Primary dark — text, backgrounds, CTAs |
| Stone | `#F4F1E7` | Dominant background (80%) |
| Light Stone | `#FCFBF8` | Card surfaces |
| Hair | `#9BD1C2` | Teal — hair treatment category |
| Weight | `#FFA87C` | Coral — weight category / discount badges |
| Testosterone | `#B9F00A` | Lime — testosterone category |
| Menopause | `#C6C2FF` | Lilac — menopause category |

## Stack

- **HTML + Tailwind CSS (CDN)** — no build step
- **Vanilla JS** — card selection, calendar picker, slide-up sheets, expandable panels
- **Hosted on Render** — static site, auto-deploys on push to `main`
- **PR previews enabled** — each pull request gets a unique preview URL

## Development

No build step required. Edit any `.html` file and open directly in a browser, or push to trigger a Render deploy.

```bash
# Clone
git clone https://github.com/Jamie113/voy-portal.git
cd voy-portal

# Open locally
open index.html
```

## Deployment

Hosted as a static site on [Render](https://render.com). Configuration in `render.yaml`.

- **Production:** auto-deploys on every push to `main`
- **PR previews:** enabled — Render builds a preview URL for every open pull request
