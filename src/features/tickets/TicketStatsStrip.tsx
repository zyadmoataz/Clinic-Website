import { CalendarCheck2, CheckCircle2, Info, Ticket } from 'lucide-react';
import type { Appointment } from '@/types';

export function TicketStatsStrip({ appointments }: { appointments: Appointment[] }) {
  const arrived = appointments.filter((a) => a.status === 'Arrived').length;
  const completed = appointments.filter((a) => a.status === 'Completed').length;

  const cards = [
    {
      icon: Ticket,
      label: 'Matching Tickets',
      value: appointments.length,
      tone: 'bg-primary-soft text-primary'
    },
    {
      icon: CalendarCheck2,
      label: 'Checked In at Desk',
      value: arrived,
      tone: 'bg-accent-soft text-accent'
    },
    {
      icon: CheckCircle2,
      label: 'Completed Visits',
      value: completed,
      tone: 'bg-success-soft text-success'
    }
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.label}
            className="spotlight-card bg-surface border-border flex items-center gap-3.5 rounded-2xl border p-4 shadow-sm"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.tone}`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-muted text-xs font-medium">{c.label}</p>
              <p className="text-text text-xl font-extrabold tabular-nums">{c.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TicketPolicyCard() {
  return (
    <div className="bg-surface-2 border-border mt-8 flex items-start gap-3 rounded-2xl border p-5">
      <Info className="text-primary mt-0.5 h-5 w-5 shrink-0" />
      <div className="text-muted space-y-1 text-xs leading-relaxed">
        <p className="text-text text-sm font-bold">Queue Check-In &amp; Rescheduling Guide</p>
        <p>
          Open any Confirmed ticket to print your QR Check-In Pass, copy your CLR reference code,
          download an ICS calendar invite, or release your slot immediately if your plans change.
        </p>
      </div>
    </div>
  );
}
