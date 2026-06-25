import { useTranslation } from 'react-i18next';
// ==========================================
// OWNER: Doaa
// PURPOSE: Booking Flow - Date Selection
// ACTION: Replace this static HTML skeleton with your own logic!
// ==========================================

export function DatePicker() {
  const { t } = useTranslation();
  return (
    <div className="mb-8">
      <h3 className="text-text mb-4 text-sm font-medium">{t('booking.select_date')}</h3>
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-4">
        {/* Doaa: Map over your dates here! */}
        <button className="border-border hover:border-primary flex min-w-[72px] flex-col items-center justify-center rounded-xl border p-3">
          <span className="text-muted text-xs uppercase">{t('booking.mon')}</span>
          <span className="text-text text-xl font-bold">12</span>
        </button>
        <button className="border-primary bg-primary flex min-w-[72px] flex-col items-center justify-center rounded-xl border p-3 shadow-md">
          <span className="text-on-primary text-xs uppercase opacity-80">{t('booking.tue')}</span>
          <span className="text-on-primary text-xl font-bold">13</span>
        </button>
      </div>
    </div>
  );
}
