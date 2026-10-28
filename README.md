# Diwali Bazaar — Digital Diwali Thali (React + TypeScript + Vite)

Pick items from an illustrated Diwali stall (diya, mithai, patakhe, phool, chocolate, sajavat, pooja samagri, dry fruits), write a note, enter names, and get a link. Whoever opens the link watches the pooja thali assemble with a glowing diya, fireworks and your note.

No backend needed — the whole thali is encoded in the link (`/t/<code>`).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Make it yours

| What | Where |
|---|---|
| Brand name, tagline, Diwali date, contact email | `src/config/brand.ts` |
| Items on the shelf, order, Free/Soon status | `src/data/items.ts` |
| Options for each item (diya, mithai, patakhe, phool, chocolate, sajavat, pooja samagri) | `STYLE_OPTIONS` in `src/data/items.ts` + SVGs in `src/assets/items/` |
| Colors & fonts | top of `src/styles.css` (`:root`) |
| Page title / meta | `index.html` |
| Terms & Privacy text | `src/pages/LegalPage.tsx` (starter text — get it reviewed) |

All illustrations are original SVGs in `src/assets/` — swap any file for your own PNG/SVG with the same name.

## Structure

```
src/
  config/brand.ts          brand settings
  data/items.ts            shop items + designs per item
  state/ThaliContext.tsx   basket state (saved to localStorage)
  lib/shareLink.ts         encode/decode thali ↔ URL
  lib/countdown.ts         "Diwali in N days"
  components/              ShelfItem, BasketBar, StylePicker, NoteModal, ThaliPlate, Modal, Toast, Footer
  pages/                   ShopPage (/), ReviewPage (/review), OpenThaliPage (/t/:code), LegalPage
  assets/                  shop-scene, thali, items/*.svg
```

## Deploying

It's a single-page app, so the host must serve `index.html` for every route (otherwise `/t/...` links 404):

- **Vercel**: `vercel.json` is included.
- **Netlify**: `public/_redirects` is included.
