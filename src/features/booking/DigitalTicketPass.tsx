import { CalendarPlus, Copy, MapPin, Printer, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button, QrCodeSvg, StatusBadge } from '@/components/ui';
import { showToast } from '@/lib/toast';
import type { Appointment } from '@/types';
import { formatDate } from '@/utils/formatDate';
import { formatTimeLabel } from '@/utils/formatTimeLabel';
import { sanitizeExternalUrl } from '@/utils/safeRedirect';

function downloadIcs(appt: Appointment) {
  const startClean = `${appt.date.replace(/-/g, '')}T${appt.startTime.replace(':', '')}00`;
  const endClean = `${appt.date.replace(/-/g, '')}T${(appt.endTime || appt.startTime).replace(':', '')}00`;
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `UID:${appt.ticketCode || appt.id}@medoraclinics.com`,
    `DTSTART:${startClean}`,
    `DTEND:${endClean}`,
    `SUMMARY:${appt.serviceName} with ${appt.doctorName}`,
    `LOCATION:${appt.roomNumber || 'Medora Clinics'}`,
    `DESCRIPTION:Clinic Ticket ${appt.ticketCode || appt.id} · Queue Token ${appt.queueToken || ''}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${appt.ticketCode || `ticket-${appt.id}`}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export function DigitalTicketPass({ appointment }: { appointment: Appointment }) {
  const { t } = useTranslation();
  const ticketCode = appointment.ticketCode || `MDR-${appointment.id}`;
  const meetingUrl = sanitizeExternalUrl(appointment.meetingLink);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(ticketCode);
      showToast.success(t('booking.ticket_copied', 'Ticket code copied!'));
    } catch {
      showToast.error(t('common.error_occurred'));
    }
  };

  return (
    <div className="print-area animate-fade-up bg-surface border-border overflow-hidden rounded-3xl border shadow-lg">
      <div className="bg-primary text-on-primary flex flex-wrap items-center justify-between gap-3 px-6 py-4">
        <div>
          <p className="text-[11px] font-semibold tracking-wider uppercase opacity-80">
            {t('booking.digital_ticket', 'Medora Clinics Digital Ticket')}
          </p>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="font-display text-lg font-extrabold tabular-nums">{ticketCode}</span>
            <button
              type="button"
              onClick={handleCopyCode}
              aria-label="Copy ticket code"
              className="no-print cursor-pointer rounded-md p-1 opacity-80 hover:bg-white/15 hover:opacity-100"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div className="rounded-2xl bg-white/15 px-4 py-2 text-center">
          <p className="text-[10px] font-semibold uppercase opacity-80">
            {t('booking.queue_token', 'Queue Token')}
          </p>
          <p className="font-display text-xl font-extrabold tabular-nums">
            #{appointment.queueToken || `A-${appointment.id}`}
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2 text-start">
            <StatusBadge status={appointment.status} />
            <h2 className="text-text text-xl font-bold">{appointment.doctorName}</h2>
            <p className="text-muted text-sm">{appointment.serviceName}</p>
            <div className="text-text flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs font-semibold tabular-nums">
              <span>{formatDate(appointment.date)}</span>
              <span>·</span>
              <span>{formatTimeLabel(appointment.startTime)}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="text-primary h-3.5 w-3.5" />
                {appointment.roomNumber || 'Main Clinic'}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative overflow-hidden rounded-xl">
              <QrCodeSvg value={ticketCode} size={96} />
              <span
                aria-hidden="true"
                className="bg-accent qr-scan-beam no-print pointer-events-none absolute inset-x-1 top-1 h-0.5 rounded-full"
              />
            </div>
            <span className="text-faint text-[10px] font-semibold uppercase">
              {t('booking.scan_checkin', 'Reception Check-In')}
            </span>
          </div>
        </div>

        {appointment.mode === 'Online' && meetingUrl && (
          <div className="bg-primary-soft border-primary/20 no-print mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Video className="text-primary h-4 w-4" />
              <span>{t('booking.join_link')}</span>
            </div>
            <Button
              type="button"
              onClick={() => window.open(meetingUrl, '_blank', 'noopener,noreferrer')}
              className="px-4 py-2 text-xs"
            >
              {t('booking.join_meeting')}
            </Button>
          </div>
        )}

        <div className="border-border no-print mt-5 flex flex-wrap gap-2.5 border-t pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => window.print()}
            className="gap-1.5 px-4 py-2 text-xs"
          >
            <Printer className="h-3.5 w-3.5" />
            {t('booking.print_ticket', 'Print / Save PDF')}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => downloadIcs(appointment)}
            className="gap-1.5 px-4 py-2 text-xs"
          >
            <CalendarPlus className="h-3.5 w-3.5" />
            {t('booking.add_calendar', 'Add to Calendar')}
          </Button>
        </div>
      </div>
    </div>
  );
}
