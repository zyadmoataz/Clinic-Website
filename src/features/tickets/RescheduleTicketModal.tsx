import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDoctorQuery, useDoctorSlotsQuery } from '@/api/queries/doctors.query';
import { useRescheduleAppointment } from '@/api/queries/appointment.query';
import { Button, Modal, Skeleton } from '@/components/ui';
import type { Appointment } from '@/types';
import { shortDateParts } from '@/utils/formatDate';
import { formatTimeLabel } from '@/utils/formatTimeLabel';

interface RescheduleTicketModalProps {
  appointment: Appointment | null;
  onClose: () => void;
}

export function RescheduleTicketModal({ appointment, onClose }: RescheduleTicketModalProps) {
  const { t } = useTranslation();
  const doctorId = appointment?.doctorId ? String(appointment.doctorId) : undefined;
  const serviceId = appointment?.serviceId ? Number(appointment.serviceId) : null;

  const { data: doctor } = useDoctorQuery(doctorId);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const activeDate = selectedDate ?? doctor?.nearestAvailableDates[0] ?? null;
  const { data: slots, isLoading: slotsLoading } = useDoctorSlotsQuery(
    doctorId,
    activeDate,
    serviceId
  );
  const { mutate: reschedule, isPending } = useRescheduleAppointment(() => {
    setSelectedDate(null);
    setSelectedSlot(null);
    onClose();
  });

  if (!appointment) return null;

  const handleConfirm = () => {
    if (!activeDate || !selectedSlot) return;
    reschedule({ id: appointment.id, payload: { date: activeDate, startTime: selectedSlot } });
  };

  return (
    <Modal
      isOpen={!!appointment}
      onClose={onClose}
      title={t('appointments.reschedule_title', 'Reschedule Ticket')}
    >
      <div className="space-y-4">
        <p className="text-muted text-sm">
          {appointment.doctorName} · {appointment.serviceName}
        </p>

        <div className="flex flex-wrap gap-2">
          {(doctor?.nearestAvailableDates ?? []).map((d) => {
            const parts = shortDateParts(d);
            const active = activeDate === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setSelectedDate(d);
                  setSelectedSlot(null);
                }}
                className={`flex w-14 cursor-pointer flex-col items-center rounded-xl border py-2 text-xs font-semibold ${
                  active
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-border bg-surface-2 text-text'
                }`}
              >
                <span className="text-[10px] opacity-80">{parts.weekday}</span>
                <span className="text-sm font-bold">{parts.day}</span>
                <span className="text-[10px] opacity-80">{parts.month}</span>
              </button>
            );
          })}
        </div>

        {slotsLoading ? (
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
          </div>
        ) : (
          <div className="grid max-h-48 grid-cols-3 gap-2 overflow-y-auto">
            {(slots ?? []).map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`cursor-pointer rounded-xl border py-2 text-xs font-semibold tabular-nums ${
                  selectedSlot === slot
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-border bg-surface-2 text-text'
                }`}
              >
                {formatTimeLabel(slot)}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            {t('common.cancel', 'Cancel')}
          </Button>
          <Button type="button" disabled={!selectedSlot || isPending} onClick={handleConfirm}>
            {t('appointments.confirm_reschedule', 'Confirm New Time')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
