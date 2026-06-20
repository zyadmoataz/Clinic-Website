// ==========================================
// OWNER: Zyad, Othman
// PURPOSE: Footer Component (Shared layout)
// ==========================================
import React from 'react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-border bg-surface text-muted duration-normal border-t py-8 transition-colors">
      <div className="container-main flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-text flex items-center gap-2 font-bold">
          <span className="text-primary">✦</span>
          <span>{t('common.appName', 'Clarity Clinic')}</span>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} {t('common.appName', 'Clarity Clinic')}.{' '}
          {t('footer.allRightsReserved', 'All rights reserved.')}
        </p>
      </div>
    </footer>
  );
}
