import { useTranslation } from 'react-i18next';
import { CalendarCheck2 } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';

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
    <div className="border-border bg-surface w-full rounded-2xl border p-6 shadow-sm">
      <div className="border-border mb-4 flex items-center gap-2 border-b pb-3">
        <CalendarCheck2 className="text-primary h-5 w-5" />
        <h3 className="text-text text-base font-bold">
          {t('booking.summaryTitle', 'Booking Summary')}
        </h3>
      </div>

      <div className="divide-border divide-y text-sm">
        <div className="flex justify-between gap-2 py-2.5">
          <span className="text-muted">{t('booking.summaryDoctor', 'Doctor')}</span>
          <span className="text-text text-end font-semibold">{doctorName}</span>
        </div>
        <div className="flex justify-between gap-2 py-2.5">
          <span className="text-muted">{t('booking.summaryService', 'Service')}</span>
          <span className="text-text text-end font-semibold">{serviceName}</span>
        </div>
        <div className="flex justify-between gap-2 py-2.5">
          <span className="text-muted">{t('booking.summaryDate', 'Date')}</span>
          <span className="text-text text-end font-semibold">{formatDate(date)}</span>
        </div>
        <div className="flex justify-between gap-2 py-2.5">
          <span className="text-muted">{t('booking.summaryTimeSlot', 'Time')}</span>
          <span className="text-text text-end font-semibold tabular-nums">{timeSlot}</span>
        </div>
        <div className="text-primary flex items-center justify-between pt-4 text-base font-extrabold tabular-nums">
          <span>{t('booking.summaryTotal', 'Total Amount')}</span>
          <span>{price} EGP</span>
        </div>
      </div>
    </div>
  );
}
