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
    <div
      onClick={onClick}
      className={`card duration-normal cursor-pointer rounded-2xl border p-6 transition-all hover:shadow-md ${
        selected
          ? 'border-primary ring-primary-ring bg-primary-soft ring-2'
          : 'border-border bg-surface'
      }`}
    >
      <h3 className="text-text mb-2 text-lg font-bold">{service.name}</h3>
      <div className="text-muted flex items-center justify-between text-sm">
        <span>{service.durationMinutes} mins</span>
        <span className="text-primary font-semibold">{service.price} EGP</span>
      </div>
    </div>
  );
}
