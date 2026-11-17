import { Monitor, ShieldCheck, Stethoscope, Wallet } from 'lucide-react';
import type { DoctorSummary } from '@/types';

export function DoctorsSummaryStrip({ doctors }: { doctors: DoctorSummary[] }) {
  if (!doctors.length) return null;
  const onlineCount = doctors.filter((d) => d.supportsOnline).length;
  const minFee = Math.min(
    ...doctors.flatMap((d) => d.services.map((s) => s.price)).filter((p) => p > 0),
    320
  );

  const items = [
    {
      icon: Stethoscope,
      label: 'Verified Specialists',
      value: `${doctors.length} Active`,
      tone: 'bg-primary-soft text-primary'
    },
    {
      icon: Monitor,
      label: 'Telehealth Ready',
      value: `${onlineCount} Doctors`,
      tone: 'bg-accent-soft text-accent'
    },
    {
      icon: Wallet,
      label: 'Transparent Visit Fees',
      value: `From ${minFee} EGP`,
      tone: 'bg-success-soft text-success'
    }
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="spotlight-card bg-surface border-border flex items-center gap-3.5 rounded-2xl border px-4 py-3.5 shadow-sm"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.tone}`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-muted truncate text-xs font-medium">{item.label}</p>
              <p className="text-text text-sm font-extrabold tabular-nums">{item.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function DoctorsAssuranceFooter() {
  return (
    <div className="bg-surface-2 border-border mt-10 flex flex-col justify-between gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center">
      <div className="flex items-start gap-3">
        <span className="bg-primary-soft text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-text text-sm font-bold">
            Zero Booking Fees &amp; Flexible Rescheduling
          </h2>
          <p className="text-muted mt-0.5 text-xs">
            Pay securely online or cash at reception. Free slot release up to check-in time.
          </p>
        </div>
      </div>
      <div className="text-muted flex flex-wrap gap-2 text-xs font-semibold">
        <span className="bg-surface border-border rounded-full border px-3 py-1">
          QR Check-In Pass
        </span>
        <span className="bg-surface border-border rounded-full border px-3 py-1">Instant E-Rx</span>
        <span className="bg-surface border-border rounded-full border px-3 py-1">
          Card &amp; Cash
        </span>
      </div>
    </div>
  );
}
