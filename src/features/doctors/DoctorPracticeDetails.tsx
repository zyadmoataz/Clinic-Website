import { CheckCircle2, Clock3, FileText, MapPin, ShieldCheck, Star } from 'lucide-react';
import type { DoctorDetail } from '@/types';

export function DoctorPracticeDetails({ doctor }: { doctor: DoctorDetail }) {
  const prepChecklist = [
    'Receive an instant QR code & Queue Token immediately after booking.',
    'Arrive 10 minutes before your slot—scan or share your CLR ticket at reception.',
    'Structured diagnosis and dosage instructions appear in Prescriptions right after completion.',
    'Reschedule or cancel freely anytime from My Clinic Tickets.'
  ];

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="spotlight-card bg-surface border-border rounded-2xl border p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="bg-primary-soft text-primary flex h-9 w-9 items-center justify-center rounded-xl">
            <FileText className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-text text-base font-bold">What to Expect at Your Visit</h2>
            <p className="text-muted text-xs">Clear check-in &amp; E-Prescription workflow</p>
          </div>
        </div>
        <ul className="space-y-3">
          {prepChecklist.map((line) => (
            <li key={line} className="text-muted flex items-start gap-2.5 text-sm">
              <CheckCircle2 className="text-success mt-0.5 h-4 w-4 shrink-0" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="spotlight-card bg-surface border-border rounded-2xl border p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="bg-accent-soft text-accent flex h-9 w-9 items-center justify-center rounded-xl">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-text text-base font-bold">Practice Standards &amp; Suite</h2>
              <p className="text-muted text-xs">Verified credentials &amp; patient satisfaction</p>
            </div>
          </div>
          {doctor.rating > 0 && (
            <span className="bg-warning-soft text-warning inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold tabular-nums">
              <Star className="h-3.5 w-3.5 fill-current" />
              {doctor.rating.toFixed(1)} ({doctor.reviewCount})
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="bg-surface-2 rounded-xl p-3.5">
            <p className="text-muted flex items-center gap-1.5 text-xs font-semibold">
              <MapPin className="text-primary h-3.5 w-3.5" /> Clinic Suite
            </p>
            <p className="text-text mt-1 text-sm font-bold">
              {doctor.roomNumber || 'Main Clinic Wing'}
            </p>
          </div>
          <div className="bg-surface-2 rounded-xl p-3.5">
            <p className="text-muted flex items-center gap-1.5 text-xs font-semibold">
              <Clock3 className="text-accent h-3.5 w-3.5" /> Avg Wait Time
            </p>
            <p className="text-text mt-1 text-sm font-bold tabular-nums">Under 8 minutes</p>
          </div>
        </div>
      </div>
    </section>
  );
}
