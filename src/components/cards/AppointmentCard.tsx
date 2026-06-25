export interface AppointmentCardProps {
  statusLabel: string;
  currencyLabel: string;
  appointment: {
    id: number;
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

const STATUS_DOT: Record<string, string> = {
  confirmed: 'bg-emerald-500',
  completed: 'bg-blue-500',
  cancelled: 'bg-red-400',
  'no-show': 'bg-yellow-400',
  arrived: 'bg-purple-500',
  pending: 'bg-orange-400'
};

const STATUS_TEXT: Record<string, string> = {
  confirmed: 'text-emerald-600',
  completed: 'text-blue-600',
  cancelled: 'text-red-500',
  'no-show': 'text-yellow-600',
  arrived: 'text-purple-600',
  pending: 'text-orange-500'
};

export function AppointmentCard({
  appointment,
  onClick,
  statusLabel,
  currencyLabel,
  toLocalizedNumbers
}: AppointmentCardProps) {
  const key = appointment.status?.toLowerCase();

  return (
    <div
      onClick={onClick}
      className="bg-surface border-border cursor-pointer rounded-2xl border px-6 py-5 transition-shadow hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-text text-base leading-snug font-semibold">{appointment.doctorName}</p>
          <p className="text-text mt-0.5 text-sm opacity-50">
            {appointment.serviceName} · {appointment.date} · {appointment.startTime}
            {appointment.endTime ? ` – ${appointment.endTime}` : ''}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {appointment.mode && (
              <span className="bg-border text-text rounded-full px-3 py-1 text-xs opacity-70">
                {appointment.mode}
              </span>
            )}
            {appointment.paymentMethod && (
              <span className="bg-border text-text rounded-full px-3 py-1 text-xs opacity-70">
                {appointment.paymentMethod}
              </span>
            )}
            {appointment.price != null && appointment.price > 0 && (
              <span className="bg-border text-text rounded-full px-3 py-1 text-xs opacity-70">
                {toLocalizedNumbers(appointment.price)} {currencyLabel}
              </span>
            )}
          </div>
        </div>

        <div className="mt-1 flex shrink-0 items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${STATUS_DOT[key] ?? 'bg-muted'}`} />
          <span className={`text-sm font-medium ${STATUS_TEXT[key] ?? 'text-muted'}`}>
            {statusLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
