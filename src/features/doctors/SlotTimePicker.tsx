import { CalendarX, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatTimeLabel } from '@/utils/formatTimeLabel';

interface SlotTimePickerProps {
  slots: string[] | undefined;
  selectedTime: string | null;
  isLoading: boolean;
  isError: boolean;
  onSelectTime: (time: string) => void;
  onRetry: () => void;
}

export function SlotTimePicker({
  slots,
  selectedTime,
  isLoading,
  isError,
  onSelectTime,
  onRetry
}: SlotTimePickerProps) {
  const { t } = useTranslation();
  const morningSlots = (slots ?? []).filter((s) => Number(s.split(':')[0]) < 12);
  const afternoonSlots = (slots ?? []).filter((s) => Number(s.split(':')[0]) >= 12);

  const renderGroup = (label: string, items: string[]) =>
    items.length > 0 && (
      <div className="mb-4">
        <p className="text-muted mb-2 text-[11px] font-bold tracking-wider uppercase">{label}</p>
        <div className="grid grid-cols-3 gap-2">
          {items.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => onSelectTime(time)}
              className={`cursor-pointer rounded-xl border py-2 text-xs font-semibold tabular-nums transition-all active:scale-[0.97] ${
                selectedTime === time
                  ? 'border-primary bg-primary text-on-primary shadow-sm'
                  : 'border-border bg-surface-2 text-text hover:border-primary/40'
              }`}
            >
              {formatTimeLabel(time)}
            </button>
          ))}
        </div>
      </div>
    );

  return (
    <div>
      <p className="text-text mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
        <Clock className="h-3.5 w-3.5" />
        {t('doctors.available_times')}
      </p>

      {isLoading && (
        <div className="grid grid-cols-3 gap-2 py-2">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-9 rounded-xl" />
          ))}
        </div>
      )}

      {isError && !isLoading && <ErrorState message={t('doctors.slots_error')} onRetry={onRetry} />}

      {!isLoading && !isError && (slots?.length ?? 0) === 0 && (
        <EmptyState
          icon={<CalendarX className="h-6 w-6" />}
          title={t('doctors.no_slots_title')}
          description={t('doctors.no_slots_desc')}
        />
      )}

      {!isLoading && !isError && (slots?.length ?? 0) > 0 && (
        <div className="max-h-60 overflow-y-auto pe-1">
          {renderGroup(t('booking.morning', 'Morning'), morningSlots)}
          {renderGroup(t('booking.afternoon', 'Afternoon'), afternoonSlots)}
        </div>
      )}
    </div>
  );
}
