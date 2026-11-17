import { BadgeCheck } from 'lucide-react';
import { getDoctorInitials } from '@/utils/doctorUtils';

interface TestimonialCardProps {
  name: string;
  comment: string;
  rating: number;
}

export function TestimonialCard({ name, comment, rating }: TestimonialCardProps) {
  return (
    <article className="spotlight-card group border-border bg-surface hover:border-primary/30 flex h-full flex-col justify-between rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div
            className="text-warning flex items-center gap-0.5 text-sm"
            aria-label={`${rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < rating ? 'text-warning' : 'text-border'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-accent inline-flex items-center gap-1 text-[11px] font-semibold">
            <BadgeCheck className="h-3.5 w-3.5" />
            Verified Visit
          </span>
        </div>
        <p className="text-text/90 mb-6 text-sm leading-relaxed">"{comment}"</p>
      </div>

      <div className="border-border flex items-center gap-3 border-t pt-4">
        <span className="bg-primary-soft text-primary flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold">
          {getDoctorInitials(name)}
        </span>
        <span className="text-text text-sm font-bold">{name}</span>
      </div>
    </article>
  );
}
