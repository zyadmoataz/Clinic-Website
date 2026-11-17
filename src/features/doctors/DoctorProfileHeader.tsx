import { Briefcase, MapPin, Monitor, Star, Stethoscope } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/Badge';
import type { DoctorDetail } from '@/types';
import { getDoctorInitials } from '@/utils/doctorUtils';

export function DoctorProfileHeader({ doctor }: { doctor: DoctorDetail }) {
  const { t } = useTranslation();

  return (
    <header className="bg-surface border-border mb-8 flex flex-col gap-6 rounded-3xl border p-6 shadow-sm sm:flex-row sm:items-center md:p-8">
      <div className="border-primary-soft h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 shadow-sm">
        {doctor.photoUrl ? (
          <img
            src={doctor.photoUrl}
            width={96}
            height={96}
            alt={doctor.displayName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="bg-primary-soft text-primary flex h-full w-full items-center justify-center text-3xl font-extrabold">
            {getDoctorInitials(doctor.displayName)}
          </div>
        )}
      </div>

      <div className="flex-1">
        <h1 className="text-text text-2xl font-extrabold tracking-tight sm:text-3xl">
          {doctor.displayName}
        </h1>
        <p className="text-primary mt-1 flex items-center gap-1.5 text-sm font-semibold">
          <Stethoscope className="h-4 w-4" />
          {doctor.specialization || t('doctors.general_practice')}
        </p>

        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          {doctor.rating > 0 && (
            <Badge className="bg-warning-soft text-warning gap-1 tabular-nums">
              <Star className="h-3 w-3 fill-current" />
              {doctor.rating.toFixed(1)} ({doctor.reviewCount})
            </Badge>
          )}
          {doctor.yearsExperience > 0 && (
            <Badge className="bg-primary-soft text-primary gap-1">
              <Briefcase className="h-3 w-3" />
              {t('doctors.years_experience', { count: doctor.yearsExperience })}
            </Badge>
          )}
          {doctor.roomNumber && (
            <Badge className="bg-surface-2 text-muted gap-1">
              <MapPin className="h-3 w-3" />
              {doctor.roomNumber}
            </Badge>
          )}
          {doctor.supportsOnline && (
            <Badge className="bg-accent-soft text-accent gap-1">
              <Monitor className="h-3 w-3" />
              {t('booking.online', 'Telehealth Available')}
            </Badge>
          )}
        </div>

        {doctor.bio?.trim() && (
          <p className="text-muted mt-3 max-w-2xl text-sm leading-relaxed">{doctor.bio.trim()}</p>
        )}
      </div>
    </header>
  );
}
