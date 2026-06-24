import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Spinner } from '../components/ui/Spinner';
import { LoadingState } from '../components/feedback/LoadingState';
import { EmptyState } from '../components/feedback/EmptyState';
import { ErrorState } from '../components/feedback/ErrorState';
import { PageContainer } from '../components/layout/PageContainer';
import { AppointmentCard } from '../components/cards/AppointmentCard';
import type { FilterWhen, FilterStatus } from '../services/resources/appointment.api';
import { useAppointments, useCancelAppointment } from '../services/queries/appointment.query';

interface StatusDropdownProps {
  value: FilterStatus;
  onChange: (v: FilterStatus) => void;
  t: (key: string) => string;
}

function StatusDropdown({ value, onChange, t }: StatusDropdownProps) {
  const [open, setOpen] = useState(false);

  const STATUS_OPTIONS: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: t('appointments.statuses.all') },
    { value: 'confirmed', label: t('appointments.statuses.confirmed') },
    { value: 'arrived', label: t('appointments.statuses.arrived') },
    { value: 'completed', label: t('appointments.statuses.completed') },
    { value: 'cancelled', label: t('appointments.statuses.cancelled') },
    { value: 'NoShow', label: t('appointments.statuses.no-show') }
  ];

  const current = STATUS_OPTIONS.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="border-border bg-surface text-text hover:border-primary/40 flex min-w-[140px] items-center justify-between gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition"
      >
        <span>
          {t('appointments.status_label')}: {current?.label}
        </span>
        <svg
          className={`h-4 w-4 opacity-50 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="bg-surface border-border absolute end-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border shadow-lg">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`hover:bg-border w-full px-4 py-2.5 text-start text-sm transition ${
                value === opt.value ? 'text-primary font-semibold' : 'text-text'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyAppointments() {
  const { t, i18n } = useTranslation();
  const [whenFilter, setWhenFilter] = useState<FilterWhen>('upcoming');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [openId, setOpenId] = useState<number | null>(null);

  const isRtl = i18n.language === 'ar';

  const {
    data: appointments,
    isLoading,
    isError,
    refetch
  } = useAppointments(whenFilter, statusFilter);
  const cancelMutation = useCancelAppointment(() => setOpenId(null));

  const translateTag = (tag: string | undefined): string => {
    if (!tag) return '';
    if (i18n.language !== 'ar') return tag;

    const translations: Record<string, string> = {
      cash: 'نقدي',
      clinic: 'في العيادة',
      inclinic: 'في العيادة',
      online: 'أونلاين',
      paid: 'تم الدفع',
      pending: 'قيد الانتظار'
    };

    return translations[tag.toLowerCase().replace(/\s+/g, '')] || tag;
  };

  const toLocalizedNumbers = (input: string | number) => {
    if (input == null) return '';
    const str = input.toString();
    if (i18n.language !== 'ar') return str;

    const formatter = new Intl.NumberFormat('ar-u-nu-arab', { useGrouping: false });
    return str.replace(/\d+/g, (match) => formatter.format(Number(match)));
  };

  const formatDate = (dateStr: string) => {
    try {
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj.getTime())) return dateStr;

      const localeWithCalendar = i18n.language === 'ar' ? 'ar-u-nu-arab' : i18n.language;

      return new Intl.DateTimeFormat(localeWithCalendar, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(dateObj);
    } catch {
      return dateStr;
    }
  };

  const handleCancel = (id: number) => {
    if (window.confirm(t('appointments.cancel_confirm'))) {
      cancelMutation.mutate(id);
    }
  };

  const selectedAppointment = appointments?.find((appt) => appt.id === openId);
  const canCancel = ['confirmed', 'pending'].includes(
    selectedAppointment?.status?.toLowerCase() || ''
  );

  return (
    <PageContainer>
      <div className="relative w-full px-4 py-10 sm:px-8" dir={isRtl ? 'rtl' : 'ltr'}>
        <h1 className="text-text mb-8 text-3xl font-bold">{t('appointments.title')}</h1>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {(['upcoming', 'past'] as FilterWhen[]).map((opt) => (
              <button
                key={opt}
                onClick={() => setWhenFilter(opt)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                  whenFilter === opt
                    ? 'bg-primary/10 text-primary border-primary/20'
                    : 'bg-surface text-text border-border hover:border-primary/30'
                }`}
              >
                {opt === 'upcoming' ? t('appointments.upcoming') : t('appointments.past')}
              </button>
            ))}
          </div>

          <StatusDropdown value={statusFilter} onChange={setStatusFilter} t={t} />
        </div>

        {isLoading && <LoadingState message={t('appointments.loading')} />}

        {isError && <ErrorState message={t('appointments.error')} onRetry={refetch} />}

        {!isLoading && !isError && appointments?.length === 0 && (
          <EmptyState
            icon={
              <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            }
            title={t('appointments.no_appointments')}
            description={
              whenFilter === 'upcoming'
                ? t('appointments.no_upcoming_desc')
                : t('appointments.no_past_desc')
            }
          />
        )}

        {!isLoading && !isError && appointments && appointments.length > 0 && (
          <div className="flex flex-col gap-3">
            {appointments.map((appt) => {
              const apptKey = appt.status?.toLowerCase();
              const translatedStatus = t(`appointments.statuses.${apptKey}`) || appt.status;

              return (
                <AppointmentCard
                  key={appt.id}
                  statusLabel={translatedStatus}
                  currencyLabel={t('appointments.currency')}
                  appointment={{
                    id: appt.id,
                    doctorName: appt.doctorName,
                    serviceName: appt.serviceName,
                    status: appt.status,
                    date: formatDate(appt.date),
                    startTime: toLocalizedNumbers(appt.startTime),
                    endTime: appt.endTime ? toLocalizedNumbers(appt.endTime) : undefined,
                    mode: translateTag(appt.mode),
                    paymentMethod: translateTag(appt.paymentMethod),
                    price: appt.price
                  }}
                  toLocalizedNumbers={toLocalizedNumbers}
                  onClick={() => setOpenId(appt.id)}
                />
              );
            })}
          </div>
        )}

        {selectedAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="animate-in fade-in zoom-in-95 w-full max-w-md rounded-3xl bg-white p-8 text-gray-900 shadow-xl duration-150">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {t('appointments.details_title')}
                </h2>
                <p className="mt-1 text-sm text-gray-500 capitalize">
                  {selectedAppointment.doctorName} · {selectedAppointment.serviceName}
                </p>
              </div>

              <div className="mb-6 space-y-4 rounded-2xl border border-gray-100 bg-white p-5 text-sm">
                <div className="flex items-center justify-between py-1">
                  <span className="font-medium text-gray-400">{t('appointments.date')}</span>
                  <span className="font-bold text-gray-900">
                    {formatDate(selectedAppointment.date)}
                  </span>
                </div>

                <hr className="border-gray-100" />

                <div className="flex items-center justify-between py-1">
                  <span className="font-medium text-gray-400">{t('appointments.time')}</span>
                  <span className="font-bold text-gray-900">
                    {toLocalizedNumbers(selectedAppointment.startTime)}{' '}
                    {selectedAppointment.endTime
                      ? `– ${toLocalizedNumbers(selectedAppointment.endTime)}`
                      : ''}
                  </span>
                </div>

                <hr className="border-gray-100" />

                <div className="flex items-center justify-between py-1">
                  <span className="font-medium text-gray-400">{t('appointments.status')}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                      selectedAppointment.status?.toLowerCase() === 'cancelled'
                        ? 'border border-red-100 bg-red-50 text-red-600'
                        : 'border border-emerald-100 bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    ●{' '}
                    {t(`appointments.statuses.${selectedAppointment.status?.toLowerCase()}`) ||
                      selectedAppointment.status}
                  </span>
                </div>

                <hr className="border-gray-100" />

                <div className="flex items-center justify-between py-1">
                  <span className="font-medium text-gray-400">{t('appointments.payment')}</span>
                  <span className="rounded-lg border border-orange-100 bg-orange-50 px-3 py-0.5 text-xs font-bold text-orange-600 capitalize">
                    {translateTag(selectedAppointment.payment?.status || 'Pending')}
                  </span>
                </div>

                <hr className="border-gray-100" />

                <div className="flex items-center justify-between py-1">
                  <span className="font-medium text-gray-400">{t('appointments.amount')}</span>
                  <span className="font-bold text-gray-900">
                    {toLocalizedNumbers(selectedAppointment.price)} {t('appointments.currency')}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                {canCancel && (
                  <button
                    onClick={() => handleCancel(selectedAppointment.id)}
                    disabled={cancelMutation.isPending}
                    className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-500 shadow-sm transition hover:bg-red-50 disabled:opacity-60"
                  >
                    {cancelMutation.isPending && <Spinner className="h-4 w-4" />}
                    {t('appointments.cancel_btn')}
                  </button>
                )}

                <button
                  onClick={() => setOpenId(null)}
                  disabled={cancelMutation.isPending}
                  className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
                >
                  {t('appointments.close_btn')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
