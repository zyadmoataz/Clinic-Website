import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, CircleX } from 'lucide-react';
import { useMockPaymentMutation } from '@/api/queries/booking.query';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui';
import { BookingStepper } from '@/features/booking/BookingStepper';
import { DigitalTicketPass } from '@/features/booking/DigitalTicketPass';
import { OnlinePaymentCheckoutCard } from '@/features/booking/OnlinePaymentCheckoutCard';
import type { Appointment, AppointmentMode, PaymentCheckout, PaymentMethod } from '@/types';

type ConfirmationState = 'checkout' | 'success' | 'failed';

interface BookingConfirmationState {
  appointment: Appointment;
  payment: PaymentCheckout;
  mode: AppointmentMode;
  paymentMethod: PaymentMethod;
  amount: number;
}

function readPersistedState(): BookingConfirmationState | null {
  const raw = sessionStorage.getItem('medora_last_ticket');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as BookingConfirmationState;
  } catch {
    return null;
  }
}

export default function BookingConfirmation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const locationState =
    (useLocation().state as BookingConfirmationState | null) || readPersistedState();
  const { mutate: mockPayment, isPending } = useMockPaymentMutation();

  const [confirmedAppt, setConfirmedAppt] = useState<Appointment | null>(
    locationState?.appointment ?? null
  );
  const [status, setStatus] = useState<ConfirmationState>(
    locationState?.paymentMethod === 'Online' &&
      locationState?.appointment?.payment?.status !== 'Paid'
      ? 'checkout'
      : 'success'
  );

  if (!locationState || !confirmedAppt) {
    return (
      <PageContainer className="py-12 text-center">
        <div className="bg-surface border-border mx-auto max-w-xl rounded-3xl border p-8 shadow-sm">
          <CircleX className="text-danger mx-auto mb-4 h-12 w-12" />
          <h1 className="text-text text-2xl font-bold">{t('common.error')}</h1>
          <p className="text-muted mt-2 text-sm">{t('booking.no_data_desc')}</p>
          <Button className="mt-6 w-full" onClick={() => navigate('/doctors')}>
            {t('navbar.find_doctor')}
          </Button>
        </div>
      </PageContainer>
    );
  }

  const handlePay = () => {
    mockPayment(
      { appointmentId: confirmedAppt.id, status: 'Paid' },
      {
        onSuccess: (res) => {
          const updated = res.appointment || {
            ...confirmedAppt,
            status: 'Confirmed',
            payment: { ...confirmedAppt.payment!, status: 'Paid' }
          };
          setConfirmedAppt(updated);
          sessionStorage.setItem(
            'medora_last_ticket',
            JSON.stringify({ ...locationState, appointment: updated })
          );
          setStatus('success');
        },
        onError: () => setStatus('failed')
      }
    );
  };

  return (
    <PageContainer className="py-8 md:py-12">
      <BookingStepper currentStep={3} />
      <div className="mx-auto max-w-2xl">
        {status === 'checkout' && (
          <OnlinePaymentCheckoutCard
            amount={locationState.amount}
            isPending={isPending}
            onPay={handlePay}
            onCancel={() => navigate('/my-appointments')}
          />
        )}

        {status === 'failed' && (
          <div className="bg-surface border-border rounded-3xl border p-8 text-center shadow-sm">
            <CircleX className="text-danger mx-auto mb-4 h-12 w-12" />
            <h1 className="text-text text-2xl font-bold">{t('booking.payment_failed')}</h1>
            <p className="text-muted mt-2 text-sm">{t('booking.payment_failed_desc')}</p>
            <Button className="mt-6 w-full" onClick={handlePay} disabled={isPending}>
              {t('booking.try_payment_again')}
            </Button>
          </div>
        )}

        {status === 'success' && (
          <div className="animate-fade-up space-y-6">
            <div className="flex items-center justify-center gap-2.5 text-center">
              <CheckCircle2 className="text-success h-7 w-7" />
              <h1 className="text-text text-2xl font-extrabold">
                {locationState.paymentMethod === 'Online'
                  ? t('booking.payment_success')
                  : t('booking.booking_success')}
              </h1>
            </div>
            <DigitalTicketPass appointment={confirmedAppt} />
            <div className="no-print flex flex-wrap justify-center gap-3">
              <Button onClick={() => navigate('/my-appointments')}>
                {t('booking.view_appointment')}
              </Button>
              <Button variant="secondary" onClick={() => navigate('/doctors')}>
                {t('navbar.find_doctor')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
