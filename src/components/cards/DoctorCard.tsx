import { CalendarClock, Monitor, Star, Stethoscope } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import type { DoctorSummary } from '@/types';
import { formatDate, toIsoDate } from '@/utils/formatDate';
import { formatTimeLabel } from '@/utils/formatTimeLabel';
import { getDoctorInitials } from '@/utils/doctorUtils';

interface DoctorCardProps {
  doctor: DoctorSummary;
  onBook?: () => void;
  onQuickBook?: () => void;
  bookLabel?: string;
}

export function DoctorCard({
  doctor,
  onBook,
  onQuickBook,
  bookLabel = 'Book Now'
}: DoctorCardProps) {
  const { t } = useTranslation();
  const minPrice = doctor.services?.length
    ? Math.min(...doctor.services.map((s) => s.price))
    : null;
  const isToday = doctor.nextAvailableDate === toIsoDate();

  return (
    <article className="spotlight-card group bg-surface border-border hover:border-primary/40 flex h-full flex-col rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-start gap-3.5">
        <div className="border-primary-soft h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 shadow-sm">
          {doctor.photoUrl ? (
            <img
              src={doctor.photoUrl}
              width={56}
              height={56}
              loading="lazy"
              alt={doctor.displayName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="bg-primary-soft text-primary flex h-full w-full items-center justify-center text-lg font-extrabold">
              {getDoctorInitials(doctor.displayName)}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-text group-hover:text-primary truncate text-base font-bold transition-colors">
              {doctor.displayName}
            </h3>
            {doctor.rating > 0 && (
              <span className="bg-warning-soft text-warning inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold tabular-nums">
                <Star className="h-3 w-3 fill-current" />
                {doctor.rating.toFixed(1)}
              </span>
            )}
          </div>
          <p className="text-primary mt-0.5 flex items-center gap-1 text-xs font-semibold">
            <Stethoscope className="h-3.5 w-3.5" />
            <span className="truncate">
              {doctor.specialization || t('doctors.general_practice')}
            </span>
          </p>
          <p className="text-muted mt-2 line-clamp-2 text-xs leading-relaxed">
            {doctor.bio ||
              t('doctors.default_bio', 'Experienced specialist providing personalized care.')}
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
        {doctor.nextAvailableDate &&
          doctor.nextAvailableSlot &&
          (onQuickBook ? (
            <button
              type="button"
              onClick={onQuickBook}
              title={t('doctors.quick_book_hint', 'Book next open slot')}
              className="bg-accent-soft text-accent hover:bg-accent hover:text-on-primary inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 font-semibold tabular-nums transition-colors"
            >
              <CalendarClock className="h-3.5 w-3.5" />
              {isToday ? t('doctors.today', 'Today') : formatDate(doctor.nextAvailableDate)} ·{' '}
              {formatTimeLabel(doctor.nextAvailableSlot)}
            </button>
          ) : (
            <span className="bg-accent-soft text-accent inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold tabular-nums">
              <CalendarClock className="h-3.5 w-3.5" />
              {isToday ? t('doctors.today', 'Today') : formatDate(doctor.nextAvailableDate)} ·{' '}
              {formatTimeLabel(doctor.nextAvailableSlot)}
            </span>
          ))}
        {doctor.supportsOnline && (
          <span className="bg-surface-2 text-muted inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium">
            <Monitor className="h-3 w-3" />
            {t('booking.online', 'Online')}
          </span>
        )}
      </div>

      <div className="border-border mt-auto flex items-center justify-between gap-3 border-t pt-4">
        <div className="text-xs">
          <span className="text-muted block">{t('doctors.starting_from', 'Starting from')}</span>
          <span className="text-text font-display text-sm font-extrabold tabular-nums">
            {minPrice ? `${minPrice} EGP` : t('doctors.by_visit', 'Consultation')}
          </span>
        </div>
        <Button type="button" onClick={onBook} className="rounded-xl px-4 py-2 text-xs">
          {bookLabel}
        </Button>
      </div>
    </article>
  );
}
