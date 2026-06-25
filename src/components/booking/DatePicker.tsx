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
      <h3 className="mb-4 text-sm font-medium text-gray-800">{t('booking.select_date')}</h3>
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-4">
        {/* Doaa: Map over your dates here! */}
        <button className="flex min-w-[72px] flex-col items-center justify-center rounded-xl border border-gray-300 p-3 hover:border-blue-500">
          <span className="text-xs text-gray-500 uppercase">{t('booking.mon')}</span>
          <span className="text-xl font-bold text-gray-800">12</span>
        </button>
        <button className="flex min-w-[72px] flex-col items-center justify-center rounded-xl border border-blue-600 bg-blue-600 p-3 shadow-md">
          <span className="text-xs text-blue-100 uppercase">{t('booking.tue')}</span>
          <span className="text-xl font-bold text-white">13</span>
        </button>
      </div>
    </div>
  );
}
