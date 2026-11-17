import { CalendarDays, CalendarX, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/feedback/EmptyState';
import { formatDate, shortDateParts } from '@/utils/formatDate';
import { formatTimeLabel } from '@/utils/formatTimeLabel';
import type { DoctorDetail, DoctorService } from '@/types';
import { SlotTimePicker } from './SlotTimePicker';

interface SlotSchedulePanelProps {
  doctor: DoctorDetail;
  selectedService: DoctorService | null;
  selectedDate: string | null;
  selectedTime: string | null;
  slots: string[] | undefined;
  slotsLoading: boolean;
  slotsError: boolean;
  isAuthenticated: boolean;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
  onRetrySlots: () => void;
  onContinue: () => void;
}

export function SlotSchedulePanel({
  doctor,
  selectedService,
  selectedDate,
  selectedTime,
  slots,
  slotsLoading,
  slotsError,
  isAuthenticated,
  onSelectDate,
  onSelectTime,
  onRetrySlots,
  onContinue
}: SlotSchedulePanelProps) {
  const { t } = useTranslation();
  const canContinue = !!(selectedService && selectedDate && selectedTime);

  return (
    <div className="bg-surface border-border sticky top-24 rounded-3xl border p-6 shadow-sm">
      <h2 className="text-text mb-1 flex items-center gap-2 text-lg font-bold">
        <CalendarDays className="text-primary h-5 w-5" />
        {t('doctors.schedule_title')}
      </h2>
      <p className="text-muted mb-5 text-xs">{t('doctors.schedule_subtitle')}</p>

      {!selectedService ? (
        <div className="border-border-strong text-muted rounded-2xl border border-dashed px-4 py-10 text-center text-sm">
          {t('doctors.select_service_first')}
        </div>
      ) : (
        <>
          <p className="text-text mb-2 text-xs font-bold tracking-wider uppercase">
            {t('doctors.available_dates')}
          </p>
          {doctor.nearestAvailableDates.length === 0 ? (
            <EmptyState
              icon={<CalendarX className="h-6 w-6" />}
              title={t('doctors.no_dates_title')}
              description={t('doctors.no_dates_desc')}
            />
          ) : (
            <div className="mb-5 grid grid-cols-4 gap-2">
              {doctor.nearestAvailableDates.map((date) => {
                const parts = shortDateParts(date);
                const active = selectedDate === date;
                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() => onSelectDate(date)}
                    className={`flex cursor-pointer flex-col items-center rounded-xl border py-2 text-center transition-all ${
                      active
                        ? 'border-primary bg-primary text-on-primary shadow-sm'
                        : 'border-border bg-surface-2 text-text hover:border-primary/40'
                    }`}
                  >
                    <span className="text-[10px] font-semibold opacity-80">{parts.weekday}</span>
                    <span className="font-display text-base font-extrabold tabular-nums">
                      {parts.day}
                    </span>
                    <span className="text-[10px] font-semibold opacity-80">{parts.month}</span>
                  </button>
                );
              })}
            </div>
          )}

          {selectedDate && (
            <SlotTimePicker
              slots={slots}
              selectedTime={selectedTime}
              isLoading={slotsLoading}
              isError={slotsError}
              onSelectTime={onSelectTime}
              onRetry={onRetrySlots}
            />
          )}

          <div className="border-border mt-5 border-t pt-4">
            {canContinue && (
              <div className="bg-surface-2 mb-4 space-y-1 rounded-xl p-3 text-xs">
                <p className="text-text font-bold">{selectedService.name}</p>
                <p className="text-muted">
                  {formatDate(selectedDate!)} · {formatTimeLabel(selectedTime!)}
                </p>
                <p className="text-primary font-extrabold tabular-nums">
                  {selectedService.price} EGP
                </p>
              </div>
            )}
            <Button
              type="button"
              disabled={!canContinue}
              onClick={onContinue}
              className="w-full gap-2"
            >
              {!isAuthenticated && <Lock className="h-4 w-4" />}
              {isAuthenticated ? t('doctors.continue_to_booking') : t('doctors.sign_in_to_book')}
            </Button>
            {!isAuthenticated && canContinue && (
              <p className="text-muted mt-2 text-center text-[11px]">
                {t('doctors.redirect_note')}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
