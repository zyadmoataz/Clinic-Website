import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CalendarDays, Ticket } from 'lucide-react';
import { AppointmentCard } from '@/components/cards/AppointmentCard';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui';
import { useAppointments, useCancelAppointment } from '@/api/queries/appointment.query';
import type { FilterStatus, FilterWhen } from '@/api/resources/appointment.api';
import { CancelTicketModal } from '@/features/tickets/CancelTicketModal';
import { RescheduleTicketModal } from '@/features/tickets/RescheduleTicketModal';
import { TicketDetailModal } from '@/features/tickets/TicketDetailModal';
import { TicketFilterBar } from '@/features/tickets/TicketFilterBar';
import { TicketPolicyCard, TicketStatsStrip } from '@/features/tickets/TicketStatsStrip';
import type { Appointment } from '@/types';
import { formatDate } from '@/utils/formatDate';
import { toLocalizedNumbers, translateTag } from '@/utils/localization';

export default function MyAppointments() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [whenFilter, setWhenFilter] = useState<FilterWhen>('upcoming');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [openId, setOpenId] = useState<number | null>(null);
  const [cancelConfirmId, setCancelConfirmId] = useState<number | null>(null);
  const [rescheduleTarget, setRescheduleTarget] = useState<Appointment | null>(null);

  const {
    data: appointments,
    isLoading,
    isError,
    refetch
  } = useAppointments(whenFilter, statusFilter);
  const cancelMutation = useCancelAppointment(() => setOpenId(null));
  const selectedAppointment = appointments?.find((a) => a.id === openId) ?? null;

  return (
    <PageContainer className="py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-text text-3xl font-extrabold tracking-tight">
            {t('appointments.title')}
          </h1>
          <p className="text-muted mt-1 text-sm">{t('appointments.subtitle')}</p>
        </div>
        <Button onClick={() => navigate('/doctors')} className="gap-2">
          <Ticket className="h-4 w-4" />
          {t('navbar.book_ticket')}
        </Button>
      </div>

      <TicketFilterBar
        whenFilter={whenFilter}
        statusFilter={statusFilter}
        onWhenChange={setWhenFilter}
        onStatusChange={setStatusFilter}
      />

      {!isLoading && !isError && appointments && <TicketStatsStrip appointments={appointments} />}

      {isLoading && (
        <LoadingState variant="tickets" count={3} message={t('appointments.loading')} />
      )}
      {isError && <ErrorState message={t('appointments.error')} onRetry={refetch} />}

      {!isLoading && !isError && appointments?.length === 0 && (
        <EmptyState
          icon={<CalendarDays className="h-7 w-7" />}
          title={t('appointments.no_appointments')}
          description={
            whenFilter === 'upcoming'
              ? t('appointments.no_upcoming_desc')
              : t('appointments.no_past_desc')
          }
          action={<Button onClick={() => navigate('/doctors')}>{t('navbar.find_doctor')}</Button>}
        />
      )}

      {!isLoading && !isError && appointments && appointments.length > 0 && (
        <div className="flex flex-col gap-3">
          {appointments.map((appt) => (
            <AppointmentCard
              key={appt.id}
              currencyLabel={t('appointments.currency')}
              appointment={{
                id: appt.id,
                ticketCode: appt.ticketCode,
                queueToken: appt.queueToken,
                roomNumber: appt.roomNumber,
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
          ))}
        </div>
      )}

      <TicketPolicyCard />

      <TicketDetailModal
        appointment={selectedAppointment}
        isCancelling={cancelMutation.isPending}
        onClose={() => setOpenId(null)}
        onRequestCancel={(id) => setCancelConfirmId(id)}
        onRequestReschedule={(appt) => {
          setOpenId(null);
          setRescheduleTarget(appt);
        }}
      />
      <RescheduleTicketModal
        appointment={rescheduleTarget}
        onClose={() => setRescheduleTarget(null)}
      />
      <CancelTicketModal
        ticketId={cancelConfirmId}
        isPending={cancelMutation.isPending}
        onClose={() => setCancelConfirmId(null)}
        onConfirm={(id) => {
          cancelMutation.mutate(id);
          setCancelConfirmId(null);
        }}
      />
    </PageContainer>
  );
}
