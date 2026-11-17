import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Ticket } from 'lucide-react';
import { useAppointments } from '@/api/queries/appointment.query';
import { usePrescriptions } from '@/api/queries/prescriptions.query';
import { LanguageToggle, ThemeToggle } from '@/components/ui';

export function ProfileQuickStats() {
  const { data: upcoming } = useAppointments('upcoming', 'all');
  const { data: prescriptions } = usePrescriptions();

  const ticketCount = upcoming?.length ?? 0;
  const rxCount = prescriptions?.length ?? 0;

  return (
    <div className="space-y-4">
      <div className="spotlight-card bg-surface border-border rounded-2xl border p-5 shadow-sm">
        <h2 className="text-text mb-3 text-sm font-bold">Portal Quick Summary</h2>
        <div className="space-y-2.5">
          <Link
            to="/my-appointments"
            className="bg-surface-2 hover:bg-primary-soft/60 flex items-center justify-between rounded-xl px-4 py-3 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="bg-primary-soft text-primary flex h-9 w-9 items-center justify-center rounded-lg">
                <Ticket className="h-4 w-4" />
              </span>
              <div>
                <p className="text-text text-xs font-bold">Upcoming Tickets</p>
                <p className="text-muted text-[11px]">{ticketCount} upcoming</p>
              </div>
            </div>
            <ArrowRight className="text-muted h-4 w-4 rtl:rotate-180" />
          </Link>

          <Link
            to="/my-prescriptions"
            className="bg-surface-2 hover:bg-accent-soft/60 flex items-center justify-between rounded-xl px-4 py-3 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="bg-accent-soft text-accent flex h-9 w-9 items-center justify-center rounded-lg">
                <FileText className="h-4 w-4" />
              </span>
              <div>
                <p className="text-text text-xs font-bold">E-Prescriptions</p>
                <p className="text-muted text-[11px]">{rxCount} verified records</p>
              </div>
            </div>
            <ArrowRight className="text-muted h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>

      <div className="bg-surface border-border rounded-2xl border p-5 shadow-sm">
        <h2 className="text-text mb-1 text-sm font-bold">Display Preferences</h2>
        <p className="text-muted mb-4 text-xs">Switch interface theme or EN/AR RTL language.</p>
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </div>
  );
}
