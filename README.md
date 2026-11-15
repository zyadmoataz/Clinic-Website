# Clarity Clinic: Patient Website (React)

[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

The public website for Clarity Clinic, where patients can find doctors and book appointments in Arabic or English.

**Live demo:** https://clinic-website-brown-pi.vercel.app/

> **Demo status:** the pages that load data (doctors, booking, sign-in and appointment history) call a REST API that is no longer hosted, so they currently show error states. The interface, routing, forms and data layer are all in this repository.

## Features
- Home page with clinic information and calls to action
- Doctors, departments and services
- Appointment booking
- Patient sign-in and appointment history
- Arabic and English interface with automatic language detection
- Responsive layout for mobile, tablet and desktop
- Toast notifications for user feedback

## Tech stack

| Area | Technology |
|:---|:---|
| Framework | React 19, TypeScript, Vite |
| Routing | React Router v7 |
| Server state | TanStack Query v5 with Axios |
| Client state | Zustand |
| Forms and validation | React Hook Form, Zod (via `@hookform/resolvers`) |
| Internationalization | i18next, react-i18next, browser language detector, HTTP backend for translation files |
| Styling | Tailwind CSS v4, Lucide icons |
| Feedback and resilience | react-hot-toast, react-error-boundary |
| Code quality | ESLint, Prettier (with Tailwind class sorting), Husky, lint-staged, commitlint |

## How it is built
- **Server state vs client state:** TanStack Query handles data from the API (caching, loading and error states), while Zustand holds client-side state such as the signed-in session.
- **Typed forms:** React Hook Form with Zod schemas validates booking and sign-in forms and keeps the form types in sync with the validation rules.
- **Two languages:** i18next loads translation files over HTTP and picks the language from the browser, so Arabic and English share the same components.
- **Error handling:** error boundaries stop a single failing component from taking down the whole page, and toasts report failed requests to the user.
- **Consistent code:** ESLint and Prettier run on staged files through lint-staged and Husky, and commit messages follow Conventional Commits (commitlint).

## Run locally
```bash
npm install
npm run dev       # development server
npm run build     # type-check and production build
npm run preview   # preview the production build
npm run lint      # lint the project
```

The app expects a backend REST API for doctors, appointments and authentication. The original API is no longer hosted, so data pages will show error states until you point the app at a compatible API.

## Commit convention
Commits follow [Conventional Commits](https://www.conventionalcommits.org/), enforced with Husky and commitlint:

- `feat: add appointment booking form`
- `fix: correct language switch on first load`
- `style: align doctor card spacing`

## Next steps
- Add a mock API mode (for example with Mock Service Worker) so the demo runs without a backend
