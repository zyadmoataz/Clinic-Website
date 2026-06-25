import { useTranslation } from 'react-i18next';
// ==========================================
// OWNER: Doaa
// PURPOSE: Booking Flow - Time Selection
// ACTION: Replace this static HTML skeleton with your own dynamic map() over the API data!
// ==========================================

export function TimeSlotGrid() {
  const { t } = useTranslation();
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-800">
        <span>{t('booking.morning')}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {/* Doaa: Duplicate this button for your slots */}
        <button className="h-10 rounded-lg border border-gray-300 text-sm font-medium text-gray-800 hover:bg-gray-50">
          09:00
        </button>
        <button className="h-10 rounded-lg border border-gray-300 text-sm font-medium text-gray-800 hover:bg-gray-50">
          09:30
        </button>
      </div>

      <div className="mt-6 mb-3 flex items-center gap-2 text-sm font-medium text-gray-800">
        <span>{t('booking.afternoon')}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        <button className="h-10 rounded-lg bg-blue-600 text-sm font-medium text-white shadow-sm ring-2 ring-blue-600 ring-offset-2">
          13:00
        </button>
      </div>
    </div>
  );
}
