import { useTranslation } from 'react-i18next';
import { Select } from '@/components/ui';
import type { FilterStatus, FilterWhen } from '@/api/resources/appointment.api';

interface TicketFilterBarProps {
  whenFilter: FilterWhen;
  statusFilter: FilterStatus;
  onWhenChange: (when: FilterWhen) => void;
  onStatusChange: (status: FilterStatus) => void;
}

export function TicketFilterBar({
  whenFilter,
  statusFilter,
  onWhenChange,
  onStatusChange
}: TicketFilterBarProps) {
  const { t } = useTranslation();

  const statusOptions = [
    { value: 'all', label: `${t('appointments.status_label')}: ${t('appointments.statuses.all')}` },
    {
      value: 'confirmed',
      label: `${t('appointments.status_label')}: ${t('appointments.statuses.confirmed')}`
    },
    {
      value: 'arrived',
      label: `${t('appointments.status_label')}: ${t('appointments.statuses.arrived')}`
    },
    {
      value: 'completed',
      label: `${t('appointments.status_label')}: ${t('appointments.statuses.completed')}`
    },
    {
      value: 'cancelled',
      label: `${t('appointments.status_label')}: ${t('appointments.statuses.cancelled')}`
    },
    {
      value: 'NoShow',
      label: `${t('appointments.status_label')}: ${t('appointments.statuses.no-show')}`
    }
  ];

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-2">
        {(['upcoming', 'past'] as FilterWhen[]).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onWhenChange(opt)}
            className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
              whenFilter === opt
                ? 'bg-primary-soft text-primary border-primary/25'
                : 'bg-surface text-text border-border hover:border-primary/30'
            }`}
          >
            {opt === 'upcoming' ? t('appointments.upcoming') : t('appointments.past')}
          </button>
        ))}
      </div>
      <div className="w-full sm:w-56">
        <Select
          aria-label={t('appointments.status_label')}
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as FilterStatus)}
          options={statusOptions}
        />
      </div>
    </div>
  );
}
