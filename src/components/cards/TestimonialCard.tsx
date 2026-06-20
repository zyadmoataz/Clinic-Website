// ==========================================
// OWNER: Othman
// PURPOSE: Renders testimonials on the home landing page
// ==========================================
import React from 'react';

interface TestimonialCardProps {
  name: string;
  comment: string;
  rating: number;
}

export function TestimonialCard({ name, comment, rating }: TestimonialCardProps) {
  return (
    <div className="card border-border bg-surface duration-normal border p-6 shadow-sm transition-all">
      <div className="text-warning mb-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < rating ? 'text-warning' : 'text-border'}>
            ★
          </span>
        ))}
      </div>
      <p className="text-muted mb-4 italic">"{comment}"</p>
      <h4 className="text-text text-sm font-bold">{name}</h4>
    </div>
  );
}
