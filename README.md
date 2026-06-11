# StockPilot — Inventory Management (Automation Playground)

A deliberately automation-friendly **React + TypeScript** demo app, built with Vite.
It mimics a real inventory management system and exposes a wide range of UI
patterns so you can practise Playwright (or any) UI automation locally.

> Every interactive element has a stable `data-testid`, so selectors stay robust.

## Modules / features to automate

| Module | Route | Patterns covered |
| --- | --- | --- |
| **Login** | `/login` | Form validation, auth error, loading state |
| **Dashboard** | `/dashboard` | Stat cards, derived values, recent-orders table |
| **Products** | `/products` | Table, search, category/status filters, column sort, pagination, delete + confirm modal, toasts |
| **Add Product** | `/products/new` | Text/number inputs, selects, radios, checkbox, regex validation, success + redirect |
| **Suppliers** | `/suppliers` | Cards, toggle state, ratings |
| **Orders** | `/orders` | Tabs/filtering, status transitions, action buttons |
| **Interactions** | `/interactions` | Drag & drop, range slider, quantity stepper, file upload |
| **Dynamic Content** | `/dynamic` | Spinners, delayed loads, delayed-enable button, live counter, progressive reveal |
| **Frames & Tabs** | `/frames` | iframe interaction, new tab/window, **shadow DOM** |

## Demo credentials

| Username | Password | Role |
| --- | --- | --- |
| `admin` | `admin123` | admin |
| `manager` | `manager123` | manager |
| `viewer` | `viewer123` | viewer |

## Getting started

```bash
cd inventory-app
npm install
npm run dev
```

The app runs at **http://localhost:5173**.

### Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |

## Notes

- State is in-memory (plus `localStorage` for the auth session). Refreshing the
  page resets product/order/supplier mutations — handy for repeatable test runs.
- No backend is required; everything is mocked in `src/data/mockData.ts`.

The Playwright automation suite for this app lives in the sibling
[`../playwright-tests`](../playwright-tests) folder.
