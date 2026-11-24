# Medora Clinics — Patient Booking & E-Prescription Portal (React 19)

[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query_v5-FF4154?style=flat-square&logo=react-query&logoColor=white)](https://tanstack.com/query)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://clinic-website-brown-pi.vercel.app/)

The patient-facing doctor discovery, smart queue ticketing, and digital e-prescription portal for **Medora Clinics**, engineered to synchronize with the companion [Staff Operations Dashboard (Angular 21)](https://github.com/zyadmoataz/Clinic-Dashboard).

**Live Demo:** [https://clinic-patient-website.vercel.app](https://clinic-patient-website.vercel.app)  
**Companion Staff Dashboard:** [https://clinic-doctor-dashboard.vercel.app/](https://clinic-doctor-dashboard.vercel.app)

---

## 1-Click Demo Credentials

- **Patient Account:** `patient@medoraclinics.com` / `Password123` (or click **1-Click Demo Patient Sign-In** directly on `/login`).
- **New Registration:** Full validated registration flow available on `/register`.

---

## Key Features & Engineering Highlights

- **Public Discovery + Seamless Booking Return-Back:** Visitors browse `/`, `/doctors`, and `/doctors/:id` (services + live slots) without signing in. Selecting a slot while signed out preserves the booking draft in both URL search params and `sessionStorage`, routes safely through `/login` or `/register` (with strict open-redirect validation), and returns directly to `/booking` checkout.
- **Digital Clinic Ticketing & E-Prescriptions:** Issues Ticket Codes (`MDR-2026-XXXX`), Queue Tokens (`#A-01`), QR check-in codes, `.ics` calendar exports, printable tickets, slot rescheduling, and printable structured E-Prescriptions.
- **Scalable Multi-Locale (`i18next`) & Semantic Theming:** Full Arabic (`ar`, `عيادات ميدورا`, RTL) and English (`en`, LTR) support using logical CSS utilities and persistent light/dark mode.
- **Security & Accessibility:** Open-redirect validation, URL scheme sanitization (`https`/`http`/`/`), ARIA dialog modals with `Escape` key & focus restore, skeleton loaders, and WCAG AA contrast.

---

## Resilient Dual-Layer HTTP Architecture (`auto` / `api` / `mock`)

Rather than hardcoding static arrays inside UI components, this application implements a **Dual-Layer HTTP Transport Adapter** (`src/api/apiClient.ts`) that preserves 100% of the production Axios client, TanStack Query v5 cache invalidation, request/response interceptors, and HTTP status error handling (`401 Unauthorized`, `409 Conflict` double-booking guards):

| Mode (`VITE_DATA_MODE`) | Behavior | Target Environment |
| :--- | :--- | :--- |
| **`auto` (Default)** | Connects to `VITE_API_BASE_URL` (`http://localhost:5000/api`) on `localhost` so the Patient Website and Staff Dashboard sync live; switches automatically to the stateful in-browser Mock Adapter on hosted origins or when no local server is running. | Local full-stack sync & static Vercel hosting |
| **`api`** | Strict HTTP mode with zero fallback. | Live production REST backend |
| **`mock`** | Routes all Axios requests directly through the stateful `localStorage` Mock Adapter (`src/api/mock/`). | Standalone zero-backend previews |

---

## Tech Stack

| Area | Technology |
| :--- | :--- |
| **Framework & Build** | React 19, TypeScript, Vite |
| **Routing** | React Router v7 |
| **Server State** | TanStack Query v5 + Axios (`dualLayerAdapter`) |
| **Client State** | Zustand (auth session, booking draft, transport source) |
| **Forms & Validation** | React Hook Form + Zod (`@hookform/resolvers`) |
| **Internationalization** | `i18next`, `react-i18next`, browser language detector, HTTP backend |
| **Styling & Icons** | Tailwind CSS v4, Lucide icons |
| **Resilience & Quality** | `react-error-boundary`, ESLint, Prettier, Husky, `lint-staged`, `commitlint` |

---

## Run Locally

```bash
npm install
npm run dev      # Starts development server at http://localhost:5173
npm run lint     # ESLint check
npm test         # Node unit tests (mock adapter + security utilities)
npm run build    # Type-check + production bundle
```
