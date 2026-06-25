import { useTranslation } from 'react-i18next';
// ==========================================
// OWNER: Doaa
// PURPOSE: Booking Flow - Service Selection
// ACTION: Replace this static HTML skeleton with your own logic!
// ==========================================

export function ServicePicker() {
  const { t } = useTranslation();
  return (
    <div className="mb-8">
      <h3 className="text-text mb-4 text-sm font-medium">{t('booking.select_service')}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {/* Doaa: Map over your services here! */}
        <button className="border-border hover:border-primary flex flex-col items-start rounded-xl border p-4 text-left">
          <span className="text-text font-semibold">{t('booking.general_checkup')}</span>
          <span className="text-muted text-sm">30 min</span>
        </button>
      </div>
    </div>
  );
}
