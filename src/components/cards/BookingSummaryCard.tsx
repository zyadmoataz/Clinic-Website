import { formatDate } from '@/utils/formatDate';
import { useTranslation } from 'react-i18next';

interface BookingSummaryCardProps {
  doctorName: string;
  serviceName: string;
  price: number;
  date: string;
  timeSlot: string;
}

export function BookingSummaryCard({
  doctorName,
  serviceName,
  price,
  date,
  timeSlot
}: BookingSummaryCardProps) {
  const { t } = useTranslation();

  return (
    <div className="card border-border bg-surface mx-auto my-10 w-11/12 rounded-2xl border p-6 shadow-sm md:w-1/2">
      <h3 className="text-text mb-4 text-lg font-bold">
        {t('booking.summaryTitle', 'Booking Summary')}
      </h3>
      <div className="divide-border divide-y text-sm">
        <div className="flex justify-between py-2">
          <span className="text-muted">{t('booking.summaryDoctor', 'Doctor')}</span>
          <span className="text-text font-semibold">{doctorName}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-muted">{t('booking.summaryService', 'Service')}</span>
          <span className="text-text font-semibold">{serviceName}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-muted">{t('booking.summaryDate', 'Date')}</span>
          <span className="text-text font-semibold">{formatDate(date)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-muted">{t('booking.summaryTimeSlot', 'Time')}</span>
          <span className="text-text font-semibold">{timeSlot}</span>
        </div>
        <div className="text-primary flex justify-between py-2 pt-4 text-base font-bold">
          <span>{t('booking.summaryTotal', 'Total Price')}</span>
          <span>{price} EGP</span>
        </div>
      </div>
    </div>
  );
}
