# Medora Clinics — Patient Website (React)

[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

The patient-facing discovery, smart ticketing, and e-prescription portal for **Medora Clinics**, built to synchronize with the companion [Staff Dashboard](https://github.com/zyadmoataz/Clinic-Dashboard).

**Live demo:** https://clinic-website-brown-pi.vercel.app/

---

## Backend Status & Dual-Layer Mock Architecture

> **Notice:** The original hosted REST backend (`https://api.clinic.kaessam.codes/api`) is offline/decommissioned.
> Rather than leaving error states or hardcoding static arrays inside UI components, this app implements a **Dual-Layer HTTP Mock Architecture** that preserves 100% of the production Axios client (`src/api/apiClient.ts`), TanStack Query cache, interceptors, and error handling (`401`, `409 Conflict` double-booking guards). Both the hosted Vercel build and standalone local sessions work seamlessly out of the box.

| Mode (`VITE_DATA_MODE`) | Behavior                                                                                                                                                                                                                                     | When to Use                                 |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------ |
| **`auto` (Default)**    | Calls `VITE_API_BASE_URL` (`http://localhost:5000/api`) on `localhost` so Patient Website and Staff Dashboard sync live; switches straight to the stateful in-browser Mock Adapter on hosted origins or when no local API server is running. | Local development & static Vercel hosting   |
| **`api`**               | Strict HTTP mode with zero fallback.                                                                                                                                                                                                         | Connecting back to a live .NET/Node backend |
| **`mock`**              | Routes all Axios calls directly through the in-browser `localStorage` Mock Adapter (`src/api/mock/`).                                                                                                                                        | Offline or zero-backend previews            |

---

## Demo Credentials

- **Patient Account:** `patient@medoraclinics.com` / `Password123` (or click **1-Click Demo Patient Sign-In** on `/login`)
- You can also register a brand-new patient account on `/register`.

---

## Key Features & Engineering Highlights

- **Public Discovery + Seamless Booking Return-Back:** Visitors browse `/`, `/doctors`, and `/doctors/:id` (services + live slots) without signing in. Selecting a slot while signed out preserves the booking draft in both URL search params and `sessionStorage`, routes safely through `/login` or `/register` (with open-redirect validation), and returns directly to `/booking` checkout.
- **Digital Clinic Ticketing:** Issues Ticket Codes (`MDR-2026-XXXX`), Queue Tokens (`#A-01`), QR check-in codes, `.ics` calendar exports, printable tickets, slot rescheduling, and printable structured E-Prescriptions.
- **Bilingual RTL & Semantic Theming:** Arabic (`ar`, `عيادات ميدورا`) and English (`en`) via `i18next` with logical CSS utilities and persistent light/dark mode.
- **Security & Accessibility:** Open-redirect validation, URL scheme sanitization (`https`/`http`/`/`), ARIA dialog modals with `Escape` key & focus restore, skeleton loaders, and WCAG AA contrast.

---

## Tech Stack

| Area                  | Technology                                                                       |
| :-------------------- | :------------------------------------------------------------------------------- |
| Framework             | React 19, TypeScript, Vite                                                       |
| Routing               | React Router v7                                                                  |
| Server State          | TanStack Query v5 + Axios (`dualLayerAdapter`)                                   |
| Client State          | Zustand (auth session, booking draft, transport source)                          |
| Forms & Validation    | React Hook Form + Zod (`@hookform/resolvers`)                                    |
| Internationalization  | i18next, react-i18next, browser language detector, HTTP backend                  |
| Styling & Icons       | Tailwind CSS v4, Lucide icons                                                    |
| Feedback & Resilience | react-hot-toast, react-error-boundary                                            |
| Code Quality          | ESLint, Prettier (`prettier-plugin-tailwindcss`), Husky, lint-staged, commitlint |

---

## Run Locally

### Option 1: Synchronized Full Platform (Patient Website + Staff Dashboard)

1. Start the shared local mock REST API (`../mock-api`):
   ```bash
   cd ../mock-api
   npm start
   # Running on http://localhost:5000/api
   ```
2. Start the Patient Website:
   ```bash
   npm install
   npm run dev
   # Running on http://localhost:5173
   ```
3. Start the companion [Staff Dashboard](../staff-dashboard) (`npm run start` on `http://localhost:4200`). Patient bookings, reception check-ins, walk-ins, and doctor E-Prescriptions reflect live across both apps.

### Option 2: Standalone Frontend Only

```bash
npm install
npm run dev
```

Without `mock-api` running, `VITE_DATA_MODE=auto` activates the stateful in-browser Mock Adapter automatically.

### Quality Checks

```bash
npm run lint    # ESLint
npm test        # Node unit tests (mock adapter + security utilities)
npm run build   # Type-check + production bundle
npm run preview # Preview production build locally
```

---

## Commit Convention

Commits follow [Conventional Commits](https://www.conventionalcommits.org/), enforced via Husky and `commitlint`:

- `feat: add appointment booking form`
- `fix: correct language switch on first load`
- `style: align doctor card spacing`
