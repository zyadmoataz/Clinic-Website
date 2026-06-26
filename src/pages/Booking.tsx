// ==========================================
// OWNER: Doaa
// ==========================================

import { useBookAppointmentMutation, useMockPaymentMutation } from '@/api/queries/booking.query';
import { BookingSummaryCard } from '@/components/cards/BookingSummaryCard';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button, Spinner } from '@/components/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarX } from 'lucide-react';
import type { AppointmentMode, PaymentMethod } from '@/api/resources/booking.api';
import { formatTimeLabel } from '@/utils/formatTimeLabel';

interface BookingLocationState {
  doctorId: string;
  doctorName: string;
  serviceId: number;
  serviceName: string;
  price: number;
  date: string;
  timeSlot: string;
}

export default function Page() {
  const state = useLocation().state as BookingLocationState | undefined;

  const navigate = useNavigate();
  const { t } = useTranslation();

  // const [mode, setMode] = useState<AppointmentMode>('Online');
  // const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Online');
  const [mode] = useState<AppointmentMode>('InClinic');
  const [paymentMethod] = useState<PaymentMethod>('Cash');
  const [error, setError] = useState(false);

  const { mutate: bookAppointment, isPending } = useBookAppointmentMutation();
  const { mutate: mockPayment } = useMockPaymentMutation();

  if (!state) {
    return (
      <PageContainer className="py-10">
        <EmptyState
          icon={<CalendarX className="h-6 w-6" />}
          title={t('booking.no_data')}
          description={t('booking.no_data_desc')}
        />
      </PageContainer>
    );
  }

  const handleBook = () => {
    setError(false);

    bookAppointment(
      {
        doctorId: state.doctorId,
        serviceId: state.serviceId,
        date: state.date,
        startTime: state.timeSlot,
        mode,
        paymentMethod
      },
      {
        onSuccess: (response) => {
          mockPayment(
            {
              appointmentId: response.appointment.id,
              status: 'Paid'
            },
            {
              onSuccess: () => navigate('/appointments'),
              onError: () => setError(true)
            }
          );
        },
        onError: () => setError(true)
      }
    );
  };

  return (
    <PageContainer className="py-8 text-center">
      <div className="mx-auto w-11/12 md:h-1/2">
        {error && (
          <div className="mt-6">
            <ErrorState message={t('booking.book_error')} onRetry={handleBook} />
          </div>
        )}

        {!error && (
          <>
            <BookingSummaryCard
              doctorName={state.doctorName}
              serviceName={state.serviceName}
              price={state.price}
              date={state.date}
              timeSlot={formatTimeLabel(state.timeSlot)}
            />

            <Button
              type="button"
              onClick={handleBook}
              disabled={isPending}
              className="mt-6 w-1/2 md:w-1/5"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner className="h-4 w-4" />
                  {t('booking.booking')}
                </span>
              ) : (
                t('booking.confirm_booking')
              )}
            </Button>
          </>
        )}
      </div>
    </PageContainer>
  );
}
