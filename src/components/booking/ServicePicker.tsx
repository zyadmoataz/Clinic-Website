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
      <h3 className="mb-4 text-sm font-medium text-gray-800">{t('booking.select_service')}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {/* Doaa: Map over your services here! */}
        <button className="flex flex-col items-start rounded-xl border border-gray-300 p-4 text-left hover:border-blue-500">
          <span className="font-semibold text-gray-800">{t('booking.general_checkup')}</span>
          <span className="text-sm text-gray-500">30 min</span>
        </button>
      </div>
    </div>
  );
}
