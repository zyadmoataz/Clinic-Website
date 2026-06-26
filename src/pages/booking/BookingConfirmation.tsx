// ==========================================
// OWNER: Doaa
// ==========================================

import { useMockPaymentMutation } from '@/api/queries/booking.query';
import type { AppointmentMode, PaymentCheckout, PaymentMethod, Appointment } from '@/types';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button, Spinner } from '@/components/ui';
import { CheckCircle2, CreditCard, CircleX, Video } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

type ConfirmationState = 'checkout' | 'success' | 'failed';

interface BookingConfirmationState {
  appointment: Appointment;
  payment: PaymentCheckout;
  mode: AppointmentMode;
  paymentMethod: PaymentMethod;
  amount: number;
}

export default function BookingConfirmation() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate: mockPayment, isPending } = useMockPaymentMutation();

  const { state } = useLocation() as {
    state: BookingConfirmationState;
  };

  const { appointment, mode, paymentMethod, amount } = state;

  const [status, setStatus] = useState<ConfirmationState>(
    paymentMethod === 'Online' ? 'checkout' : 'success'
  );

  const handlePay = () => {
    mockPayment(
      {
        appointmentId: appointment.id,
        status: 'Paid'
      },
      {
        onSuccess: () => setStatus('success'),
        onError: () => setStatus('failed')
      }
    );
  };

  return (
    <PageContainer className="py-12">
      <div className="mx-auto max-w-xl">
        {status === 'checkout' && (
          <div className="bg-surface border-border rounded-3xl border p-8 text-center shadow-sm">
            <CreditCard className="text-primary mx-auto mb-5 h-14 w-14" />

            <h1 className="text-text text-2xl font-bold">{t('booking.complete_payment')}</h1>

            <p className="text-muted mt-2">{t('booking.secure_checkout')}</p>

            <div className="bg-surface-2 mt-8 rounded-2xl p-5">
              <p className="text-muted text-sm">{t('booking.amount_due')}</p>

              <p className="text-primary mt-2 text-3xl font-bold">{amount} EGP</p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Button onClick={handlePay} disabled={isPending}>
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner className="h-4 w-4" />
                    {t('booking.processing_payment')}
                  </span>
                ) : (
                  t('booking.pay_amount', { amount })
                )}
              </Button>

              <Button onClick={() => navigate('/my-appointments')}>
                {t('booking.cancel_payment')}
              </Button>
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div className="bg-surface border-border rounded-3xl border p-8 text-center shadow-sm">
            <CircleX className="text-danger mx-auto mb-5 h-14 w-14" />

            <h1 className="text-text text-2xl font-bold">{t('booking.payment_failed')}</h1>

            <p className="text-muted mt-2">{t('booking.payment_failed_desc')}</p>

            <Button className="mt-8 w-full" onClick={handlePay} disabled={isPending}>
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner className="h-4 w-4" />
                  {t('booking.processing_payment')}
                </span>
              ) : (
                t('booking.try_payment_again')
              )}
            </Button>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-surface border-border rounded-3xl border p-8 text-center shadow-sm">
            <CheckCircle2 className="text-success mx-auto mb-5 h-16 w-16" />

            <h1 className="text-text text-2xl font-bold">
              {paymentMethod === 'Online'
                ? t('booking.payment_success')
                : t('booking.booking_success')}
            </h1>

            <p className="text-muted mt-2">
              {paymentMethod === 'Online'
                ? t('booking.payment_success_desc')
                : t('booking.appointment_success_desc')}
            </p>

            {mode === 'Online' && appointment.meetingLink && (
              <div className="bg-primary/5 border-primary/20 mt-8 flex items-center justify-between rounded-2xl border p-5 text-left">
                <div className="mb-3 flex items-center gap-2">
                  <Video className="text-primary h-5 w-5" />
                  <span className="font-semibold">{t('booking.join_link')}</span>
                </div>

                <Button onClick={() => window.open(appointment.meetingLink, '_blank')}>
                  {t('booking.join_meeting')}
                </Button>
              </div>
            )}

            <Button className="mt-8 w-full" onClick={() => navigate('/my-appointments')}>
              {t('booking.view_appointment')}
            </Button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
