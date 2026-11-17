import { useTranslation } from 'react-i18next';

const STATUS_STYLES: Record<string, { badge: string; dot: string }> = {
  confirmed: {
    badge: 'bg-success-soft text-success border-success/25',
    dot: 'bg-success'
  },
  arrived: {
    badge: 'bg-primary-soft text-primary border-primary/25',
    dot: 'bg-primary'
  },
  completed: {
    badge: 'bg-accent-soft text-accent border-accent/25',
    dot: 'bg-accent'
  },
  pendingpayment: {
    badge: 'bg-warning-soft text-warning border-warning/25',
    dot: 'bg-warning'
  },
  pending: {
    badge: 'bg-warning-soft text-warning border-warning/25',
    dot: 'bg-warning'
  },
  cancelled: {
    badge: 'bg-danger-soft text-danger border-danger/25',
    dot: 'bg-danger'
  },
  noshow: {
    badge: 'bg-surface-2 text-muted border-border',
    dot: 'bg-muted'
  }
};

export function StatusBadge({ status }: { status: string }) {
  const { t } = useTranslation();
  const normalized = status.toLowerCase().replace(/[^a-z]/g, '');
  const style = STATUS_STYLES[normalized] ?? {
    badge: 'bg-surface-2 text-muted border-border',
    dot: 'bg-muted'
  };

  const labelKey =
    normalized === 'noshow'
      ? 'no-show'
      : normalized === 'pendingpayment'
        ? 'pendingpayment'
        : normalized;
  const label = t(`appointments.statuses.${labelKey}`, { defaultValue: status });

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap ${style.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {label}
    </span>
  );
}
