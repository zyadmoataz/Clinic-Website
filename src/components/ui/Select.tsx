import { useTranslation } from 'react-i18next';
// ==========================================
// OWNER: Omar, Doaa
// ==========================================
import React from 'react';

export function Select({
  className = '',
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <select
        className={`bg-surface-2 text-text focus:bg-surface w-full appearance-none rounded-2xl border-none px-5 py-3.5 text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.15)] focus:outline-none disabled:opacity-50 ${className}`}
        {...props}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        <option value="1">{t('common.option_1')}</option>
        <option value="2">{t('common.option_2')}</option>
      </select>
    </div>
  );
}
