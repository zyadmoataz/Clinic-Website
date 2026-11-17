import { CalendarClock, Printer, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, QrCodeSvg, StatusBadge } from '@/components/ui';
import type { Appointment } from '@/types';
import { formatDate } from '@/utils/formatDate';
import { toLocalizedNumbers, translateTag } from '@/utils/localization';
import { sanitizeExternalUrl } from '@/utils/safeRedirect';

interface TicketDetailModalProps {
  appointment: Appointment | null;
  isCancelling: boolean;
  onClose: () => void;
  onRequestCancel: (id: number) => void;
  onRequestReschedule: (appt: Appointment) => void;
}

export function TicketDetailModal({
  appointment,
  isCancelling,
  onClose,
  onRequestCancel,
  onRequestReschedule
}: TicketDetailModalProps) {
  const { t } = useTranslation();

  if (!appointment) return null;

  const statusLower = appointment.status?.toLowerCase() || '';
  const canModify = ['confirmed', 'pending', 'pendingpayment'].includes(statusLower);
  const meetingUrl = sanitizeExternalUrl(appointment.meetingLink);

  const stages = [
    { key: 'confirmed', label: t('appointments.statuses.confirmed') },
    { key: 'arrived', label: t('appointments.statuses.arrived') },
    { key: 'completed', label: t('appointments.statuses.completed') }
  ];
  const activeStage = statusLower === 'completed' ? 2 : statusLower === 'arrived' ? 1 : 0;

  return (
    <Modal isOpen={!!appointment} onClose={onClose} title={t('appointments.details_title')}>
      <div className="space-y-5">
        <div className="bg-surface-2 border-border flex items-center justify-between gap-4 rounded-2xl border p-4">
          <div>
            <p className="text-muted text-xs font-semibold">
              {appointment.ticketCode || `MDR-${appointment.id}`} · #
              {appointment.queueToken || `A-${appointment.id}`}
            </p>
            <h3 className="text-text mt-0.5 text-base font-bold">{appointment.doctorName}</h3>
            <p className="text-muted text-xs">{appointment.serviceName}</p>
          </div>
          <QrCodeSvg value={appointment.ticketCode || `MDR-${appointment.id}`} size={72} />
        </div>

        {!['cancelled', 'noshow'].includes(statusLower) && (
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold">
            {stages.map((stage, idx) => (
              <div
                key={stage.key}
                className={`rounded-xl border px-2 py-2 ${
                  idx <= activeStage
                    ? 'border-primary/30 bg-primary-soft text-primary'
                    : 'border-border bg-surface text-muted'
                }`}
              >
                {stage.label}
              </div>
            ))}
          </div>
        )}

        <div className="border-border divide-border divide-y rounded-2xl border px-4 text-sm">
          <div className="flex justify-between py-2.5">
            <span className="text-muted">{t('appointments.date')}</span>
            <span className="text-text font-semibold">{formatDate(appointment.date)}</span>
          </div>
          <div className="flex justify-between py-2.5">
            <span className="text-muted">{t('appointments.time')}</span>
            <span className="text-text font-semibold tabular-nums">
              {toLocalizedNumbers(appointment.startTime)}
              {appointment.endTime ? ` – ${toLocalizedNumbers(appointment.endTime)}` : ''}
            </span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-muted">{t('appointments.status')}</span>
            <StatusBadge status={appointment.status} />
          </div>
          <div className="flex justify-between py-2.5">
            <span className="text-muted">{t('appointments.payment')}</span>
            <span className="text-text font-semibold">
              {translateTag(appointment.payment?.status || 'Pending')} ·{' '}
              {toLocalizedNumbers(appointment.price)} {t('appointments.currency')}
            </span>
          </div>
        </div>

        {appointment.mode === 'Online' && meetingUrl && canModify && (
          <Button
            type="button"
            variant="secondary"
            className="w-full gap-2"
            onClick={() => window.open(meetingUrl, '_blank', 'noopener,noreferrer')}
          >
            <Video className="h-4 w-4" />
            {t('booking.join_meeting')}
          </Button>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap gap-2">
            {canModify && (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  className="gap-1.5 px-4 py-2 text-xs"
                  onClick={() => onRequestReschedule(appointment)}
                >
                  <CalendarClock className="h-3.5 w-3.5" />
                  {t('appointments.reschedule_btn', 'Reschedule')}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  disabled={isCancelling}
                  onClick={() => onRequestCancel(appointment.id)}
                  className="text-danger hover:bg-danger-soft px-4 py-2 text-xs"
                >
                  {t('appointments.cancel_btn')}
                </Button>
              </>
            )}
            <Button
              type="button"
              variant="ghost"
              className="gap-1.5 px-3 py-2 text-xs"
              onClick={() => window.print()}
            >
              <Printer className="h-3.5 w-3.5" />
              {t('booking.print_ticket', 'Print')}
            </Button>
          </div>
          <Button type="button" variant="ghost" className="px-4 py-2 text-xs" onClick={onClose}>
            {t('appointments.close_btn')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
