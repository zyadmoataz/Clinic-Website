import { FileText, Pill, ShieldCheck, Stethoscope } from 'lucide-react';
import { SearchInput } from '@/components/ui';
import type { Visit } from '@/types';

interface PrescriptionSummaryBarProps {
  visits: Visit[];
  search: string;
  onSearchChange: (val: string) => void;
}

export function PrescriptionSummaryBar({
  visits,
  search,
  onSearchChange
}: PrescriptionSummaryBarProps) {
  const totalMeds = visits.reduce((sum, v) => sum + (v.prescription?.length || 0), 0);
  const uniqueDoctors = new Set(visits.map((v) => v.doctorName).filter(Boolean)).size;

  const cards = [
    {
      icon: FileText,
      label: 'Visit E-Prescriptions',
      value: visits.length,
      tone: 'bg-primary-soft text-primary'
    },
    {
      icon: Pill,
      label: 'Prescribed Medications',
      value: totalMeds,
      tone: 'bg-accent-soft text-accent'
    },
    {
      icon: Stethoscope,
      label: 'Attending Specialists',
      value: uniqueDoctors || visits.length,
      tone: 'bg-success-soft text-success'
    }
  ];

  return (
    <div className="no-print mb-6 space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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

      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Filter prescriptions by medication, diagnosis, doctor, or ticket..."
        ariaLabel="Filter prescriptions"
      />
    </div>
  );
}

export function PrescriptionVerificationFooter() {
  return (
    <div className="bg-surface-2 border-border no-print mt-8 flex items-start gap-3 rounded-2xl border p-5">
      <ShieldCheck className="text-accent mt-0.5 h-5 w-5 shrink-0" />
      <p className="text-muted text-xs leading-relaxed">
        Every digital E-Prescription issued through Medora Clinics includes verified visit metadata
        and medication schedules. Click Print E-Prescriptions above to save an A4 pharmacy copy.
      </p>
    </div>
  );
}
