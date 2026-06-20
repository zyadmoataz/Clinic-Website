# Clarity Clinic — Patient Website (React)

This is the starter repository for the Patient-facing booking application.

## 🚀 Getting Started

1. `npm install`
2. `npm run dev` (Runs on http://localhost:5173)

## 📁 Naming Conventions & Rules
- **Files:** Use `PascalCase.tsx` for components (e.g. `DoctorCard.tsx`, `BookingForm.tsx`).
- **Interfaces:** Export interfaces starting with `I` or descriptive names (e.g. `interface DoctorProps`).
- **State:** Use local state `useState` for UI logic. We have stripped out the complex `authStore.ts` — you must build the authentication logic yourself using Zustand or React Context!

## 🛠️ Tech Stack
- React 19 + Vite
- TypeScript
- Tailwind CSS v4 (Premium Medical Blue Theme)
- Axios & TanStack Query (For API fetching)
- React Router DOM
- i18next (Arabic / English)

## 📝 Commits
We enforce **Conventional Commits** using husky and commitlint. Your commits must follow this format:
- `feat: add login form`
- `fix: resolve auth token issue`
- `chore: update packages`
