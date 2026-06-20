// ==========================================
// OWNER: Zyad, Othman
// PURPOSE: Global Shared Layout - Navbar
// ==========================================

import { ThemeToggle, LanguageToggle } from '../ui';
import { useTranslation } from 'react-i18next';

export function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="border-border bg-surface sticky top-0 z-40 w-full border-b shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-primary text-xl font-bold">ClinicLogo</span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#"
            className="text-muted hover:text-primary text-sm font-medium transition-colors"
          >
            {t('navbar.home')}
          </a>
          <a
            href="#"
            className="text-muted hover:text-primary text-sm font-medium transition-colors"
          >
            {t('navbar.services')}
          </a>
          <a
            href="#"
            className="text-muted hover:text-primary text-sm font-medium transition-colors"
          >
            {t('navbar.doctors')}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
          <div className="bg-border mx-2 h-6 w-px"></div>
          <button className="text-primary text-sm font-medium">{t('navbar.sign_in')}</button>
        </div>
      </div>
    </header>
  );
}
