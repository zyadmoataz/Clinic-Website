import { MapPin, Ticket } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

export interface AppointmentCardProps {
  currencyLabel: string;
  appointment: {
    id: number;
    ticketCode?: string;
    queueToken?: string;
    roomNumber?: string;
    doctorName: string;
    serviceName: string;
    status: string;
    date: string;
    startTime: string;
    endTime?: string;
    mode?: string;
    paymentMethod?: string;
    price?: number;
  };
  toLocalizedNumbers: (input: string | number) => string;
  onClick?: () => void;
}

export function AppointmentCard({
  appointment,
  onClick,
  currencyLabel,
  toLocalizedNumbers
}: AppointmentCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-surface border-border hover:border-primary/40 w-full cursor-pointer rounded-2xl border p-5 text-start transition-all hover:shadow-md"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="bg-primary-soft text-primary inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold tabular-nums">
              <Ticket className="h-3 w-3" />
              {appointment.ticketCode || `MDR-${appointment.id}`}
            </span>
            {appointment.queueToken && (
              <span className="bg-accent-soft text-accent rounded-full px-2.5 py-0.5 text-xs font-extrabold tabular-nums">
                #{toLocalizedNumbers(appointment.queueToken)}
              </span>
            )}
          </div>

          <p className="text-text text-base font-bold">{appointment.doctorName}</p>
          <p className="text-muted mt-0.5 text-sm tabular-nums">
            {appointment.serviceName} · {appointment.date} · {appointment.startTime}
            {appointment.endTime ? ` – ${appointment.endTime}` : ''}
          </p>

          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {appointment.roomNumber && (
              <span className="bg-surface-2 text-muted inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium">
                <MapPin className="h-3 w-3" />
                {appointment.roomNumber}
              </span>
            )}
            {appointment.mode && (
              <span className="bg-surface-2 text-muted rounded-full px-3 py-1 font-medium">
                {appointment.mode}
              </span>
            )}
            {appointment.paymentMethod && (
              <span className="bg-surface-2 text-muted rounded-full px-3 py-1 font-medium">
                {appointment.paymentMethod}
              </span>
            )}
            {appointment.price != null && appointment.price > 0 && (
              <span className="bg-surface-2 text-text rounded-full px-3 py-1 font-bold tabular-nums">
                {toLocalizedNumbers(appointment.price)} {currencyLabel}
              </span>
            )}
          </div>
        </div>

        <div className="shrink-0">
          <StatusBadge status={appointment.status} />
        </div>
      </div>
    </button>
  );
}
