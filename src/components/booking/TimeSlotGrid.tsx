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
      <div className="text-text mb-3 flex items-center gap-2 text-sm font-medium">
        <span>{t('booking.morning')}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {/* Doaa: Duplicate this button for your slots */}
        <button className="border-border text-text hover:bg-surface-2 h-10 rounded-lg border text-sm font-medium">
          09:00
        </button>
        <button className="border-border text-text hover:bg-surface-2 h-10 rounded-lg border text-sm font-medium">
          09:30
        </button>
      </div>

      <div className="text-text mt-6 mb-3 flex items-center gap-2 text-sm font-medium">
        <span>{t('booking.afternoon')}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        <button className="bg-primary text-on-primary ring-primary h-10 rounded-lg text-sm font-medium shadow-sm ring-2 ring-offset-2">
          13:00
        </button>
      </div>
    </div>
  );
}
