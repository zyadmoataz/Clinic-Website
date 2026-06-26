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
import { Banknote, CalendarX, CreditCard } from 'lucide-react';
import type { AppointmentMode, PaymentMethod } from '@/api/resources/booking.api';
import { formatTimeLabel } from '@/utils/formatTimeLabel';
import { Monitor, Building2 } from 'lucide-react';
import { OptionCard } from './../components/cards/OptionCard';

interface BookingLocationState {
  doctorId: string;
  doctorName: string;
  serviceId: number;
  serviceName: string;
  price: number;
  date: string;
  timeSlot: string;
}

export default function BookingPage() {
  const state = useLocation().state as BookingLocationState | undefined;

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [mode, setMode] = useState<AppointmentMode>('Online');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Online');
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
          if (paymentMethod === 'Cash') {
            navigate('/my-appointments');
            return;
          }

          mockPayment(
            {
              appointmentId: response.appointment.id,
              status: 'Paid'
            },
            {
              onSuccess: () => navigate('/my-appointments'),
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
            <div className="flex flex-col items-center justify-center">
              <div className="border-border w-11/12 rounded-2xl border p-5 shadow-sm md:w-1/2">
                <h3 className="text-text mb-4 text-lg font-semibold">{t('booking.mode')}</h3>
                <OptionCard<AppointmentMode>
                  value={mode}
                  onChange={setMode}
                  options={[
                    {
                      value: 'InClinic',
                      title: t('booking.in_clinic'),
                      icon: <Building2 className="inline h-6 w-6" />
                    },
                    {
                      value: 'Online',
                      title: t('booking.online'),
                      icon: <Monitor className="inline h-6 w-6" />
                    }
                  ]}
                />
              </div>
              <div className="border-border my-10 w-11/12 rounded-2xl border p-5 shadow-sm md:w-1/2">
                <h3 className="text-text mb-4 text-lg font-semibold">
                  {t('booking.payment_method')}
                </h3>
                <OptionCard<PaymentMethod>
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  options={[
                    {
                      value: 'Cash',
                      title: t('booking.cash'),
                      icon: <Banknote className="inline h-6 w-6" />
                    },
                    {
                      value: 'Online',
                      title: t('booking.pay_online'),
                      icon: <CreditCard className="inline h-6 w-6" />
                    }
                  ]}
                />
              </div>
            </div>

            <Button
              type="button"
              onClick={handleBook}
              disabled={isPending}
              className="mt-6 w-2/3 md:w-3/5"
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
