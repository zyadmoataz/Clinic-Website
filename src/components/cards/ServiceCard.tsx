interface Service {
  id: number;
  name: string;
  durationMinutes: number;
  price: number;
}

interface ServiceCardProps {
  service: Service;
  onClick?: () => void;
  selected?: boolean;
}

export function ServiceCard({ service, onClick, selected = false }: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full cursor-pointer rounded-2xl border p-5 text-start transition-all duration-200 hover:shadow-md ${
        selected
          ? 'border-primary ring-primary-ring bg-primary-soft ring-2'
          : 'border-border bg-surface hover:border-primary/40'
      }`}
    >
      <h3 className="text-text mb-2 text-base font-bold">{service.name}</h3>
      <div className="text-muted flex items-center justify-between text-xs font-medium">
        <span className="tabular-nums">{service.durationMinutes} mins</span>
        <span className="text-primary font-display text-sm font-extrabold tabular-nums">
          {service.price} EGP
        </span>
      </div>
    </button>
  );
}
