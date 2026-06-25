// ==========================================
// OWNER: Omar
// PURPOSE: Doctor Discovery - Doctor Card
// ==========================================
import { Star, Stethoscope } from 'lucide-react';
import { Button } from '../ui/Button';
import type { DoctorSummary } from '@/api/resources/doctors.api';

interface DoctorCardProps {
  doctor: DoctorSummary;
  onView?: () => void;
  onBook?: () => void;
  viewLabel?: string;
  bookLabel?: string;
}

function getInitials(name: string): string {
  const cleaned = name.replace(/^dr\.?\s*/i, '').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'DR';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function DoctorCard({
  doctor,
  onView,
  onBook,
  viewLabel = 'View Profile',
  bookLabel = 'Book Now'
}: DoctorCardProps) {
  const { displayName, specialization, photoUrl, bio, rating, yearsExperience } = doctor;

  return (
    <div className="group bg-surface border-border hover:border-primary/40 flex h-full flex-col rounded-2xl border p-5 shadow-sm transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex items-start gap-4">
        <div className="border-surface h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 shadow-sm">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`Portrait of ${displayName}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="bg-primary-soft text-primary flex h-full w-full items-center justify-center text-xl font-bold">
              {getInitials(displayName)}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-text group-hover:text-primary truncate text-lg font-bold transition-colors">
                {displayName}
              </h3>
              <p className="text-primary mb-1 flex items-center gap-1 text-sm font-medium">
                <Stethoscope className="h-3.5 w-3.5" />
                <span className="truncate">{specialization || 'General Practice'}</span>
              </p>
            </div>
            {rating > 0 && (
              <div className="bg-warning-soft flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5">
                <Star className="text-warning h-3 w-3 fill-current" />
                <span className="text-warning text-xs font-bold">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <p className="text-muted mt-2 line-clamp-2 text-sm">
            {bio ||
              `${yearsExperience > 0 ? `${yearsExperience} years of experience. ` : ''}Trusted ${specialization || 'medical'} care at Clarity Clinic.`}
          </p>
        </div>
      </div>

      <div className="border-border mt-auto flex gap-2 border-t pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onView}
          className="flex-1 rounded-lg px-3 py-2 text-sm"
        >
          {viewLabel}
        </Button>
        <Button type="button" onClick={onBook} className="flex-1 rounded-lg px-3 py-2 text-sm">
          {bookLabel}
        </Button>
      </div>
    </div>
  );
}
