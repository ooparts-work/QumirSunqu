# Customization Guide - Qumir Sunqu

## Quick Start

All customization is done through config files in `src/data/`. No code changes needed.

## Configuration Files

### 1. `src/data/client.json` - Brand Identity & Features

```json
{
  "name": "Qumir Sunqu",
  "tagline": "Educación ambiental con impacto",
  "themeColor": "#1B4332",
  "whatsapp": "959123461",
  "instagram": "yolacorazonverde",
  "address": "Lima, Perú",
  "productModal": 1,           // 1 = show modal | 0 = hidden
  "popularSection": 1          // 1 = show popular | 0 = hidden
}
```

### 2. `src/data/menu.json` - Products & Workshop Kits

Two types of items:
- **Products**: Terrarios, kokedamas, kits → shipped with delivery fee
- **Workshops**: Talleres → per-person pricing, no delivery

### 3. `src/data/delivery.json` - Lima Delivery Zones

22 Lima districts. Update for your delivery service area.

Example: kokedamas ship to Miraflores (+S/. 8), but workshops meet at your location.

### 4. `src/index.css` - Brand Colors (Green Palette)

Edit the `@theme` variables:
- `--color-brand-accent: #40916C` → buttons, highlights (sage green)
- `--color-brand-black: #1B4332` → text (dark forest green)

## Feature Toggles

- **productModal**: 1 = product details popup | 0 = hidden
- **popularSection**: 1 = show "Los más elegidos" | 0 = hidden

## V2 Sections (Optional)

Three optional sections marked in `src/App.jsx`:
- TrustSection (partner logos)
- TestimonialsSection (client testimonials)
- CTASection (contact forms)

To disable: comment out imports and JSX blocks in App.jsx.

## Customization = Config File Edits Only

✅ Edit: `src/data/*.json` and `src/index.css`
⚠️ Manually update: `src/components/sections/AboutSection.jsx` (Yolanda bio, stats)
❌ Don't edit: Other component files (*.jsx)

No component code changes for menu, products, or features. Only AboutSection if you want to update content.

## Qumir Sunqu Specific: Dual Purpose

- **Shop**: Buy terrarios, kokedamas, kits → ships with delivery fee
- **Workshops**: Book talleres → meet at location, no shipping
- **Blog**: Learn about environmental education, programs, and mission

## Deployment

```bash
npm run build
bash scripts/deploy.sh build
```
