// ==========================================
// OWNER: Othman
// PURPOSE: Renders testimonials on the home landing page
// ==========================================
interface TestimonialCardProps {
  name: string;
  comment: string;
  rating: number;
}

export function TestimonialCard({ name, comment, rating }: TestimonialCardProps) {
  return (
    <div className="group border-border/50 bg-surface rounded-[2rem] border p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
      <div className="text-warning mb-6 flex origin-left items-center gap-1 transition-transform duration-300 group-hover:scale-105">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < rating ? 'text-warning' : 'text-border'}>
            ★
          </span>
        ))}
      </div>
      <p className="text-text/80 mb-6 text-lg leading-relaxed italic">"{comment}"</p>
      <h4 className="text-text text-base font-bold">{name}</h4>
    </div>
  );
}
