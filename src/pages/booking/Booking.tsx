import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CalendarX } from 'lucide-react';
import { useBookAppointmentMutation } from '@/api/queries/booking.query';
import { useDoctorQuery } from '@/api/queries/doctors.query';
import { BookingSummaryCard } from '@/components/cards/BookingSummaryCard';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button, Spinner } from '@/components/ui';
import { BookingOptionsPanel } from '@/features/booking/BookingOptionsPanel';
import { BookingStepper } from '@/features/booking/BookingStepper';
import { resolveBookingData } from '@/features/booking/resolveBookingData';
import { useBookingDraftStore } from '@/store/bookingDraftStore';
import type { AppointmentMode, PaymentMethod } from '@/types';
import { formatTimeLabel } from '@/utils/formatTimeLabel';
import { parseBookingParams, type BookingDraftParams } from '@/utils/safeRedirect';

export default function BookingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { draft, clearDraft } = useBookingDraftStore();

  const urlParams = parseBookingParams(location.search || searchParams.toString());
  const routeState = (location.state as Partial<BookingDraftParams> | null) ?? null;
  const targetDoctorId = routeState?.doctorId || urlParams?.doctorId || draft?.doctorId;
  const { data: doctor, isLoading: doctorLoading } = useDoctorQuery(targetDoctorId);
  const resolved = resolveBookingData(routeState, urlParams, draft, doctor);

  const [mode, setMode] = useState<AppointmentMode>('InClinic');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { mutate: bookAppointment, isPending } = useBookAppointmentMutation();

  if (doctorLoading && !resolved?.doctorName) {
    return (
      <PageContainer className="py-10">
        <LoadingState count={2} />
      </PageContainer>
    );
  }

  if (!resolved) {
    return (
      <PageContainer className="py-12">
        <EmptyState
          icon={<CalendarX className="h-6 w-6" />}
          title={t('booking.no_data')}
          description={t('booking.no_data_desc')}
          action={<Button onClick={() => navigate('/doctors')}>{t('navbar.find_doctor')}</Button>}
        />
      </PageContainer>
    );
  }

  const effectiveMode: AppointmentMode = doctor?.supportsOnline === false ? 'InClinic' : mode;

  const handleBook = () => {
    setErrorMsg(null);
    bookAppointment(
      {
        doctorId: resolved.doctorId,
        serviceId: resolved.serviceId,
        date: resolved.date,
        startTime: resolved.timeSlot,
        mode: effectiveMode,
        paymentMethod,
        notes: notes.trim() || undefined
      },
      {
        onSuccess: (response) => {
          clearDraft();
          const payload = {
            appointment: response.appointment,
            payment: response.payment,
            mode: effectiveMode,
            paymentMethod,
            amount: resolved.price || response.appointment.price
          };
          sessionStorage.setItem('medora_last_ticket', JSON.stringify(payload));
          navigate('/booking/confirmation', { state: payload, replace: true });
        },
        onError: (err) => {
          const msg = (err as { response?: { data?: { message?: string } } })?.response?.data
            ?.message;
          setErrorMsg(msg || t('booking.book_error'));
        }
      }
    );
  };

  return (
    <PageContainer className="py-8 md:py-12">
      <BookingStepper currentStep={2} />
      {errorMsg && (
        <div className="mx-auto mb-6 max-w-4xl">
          <ErrorState
            message={errorMsg}
            onRetry={() => navigate(`/doctors/${resolved.doctorId}`)}
          />
        </div>
      )}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <BookingOptionsPanel
            supportsOnline={doctor?.supportsOnline !== false}
            mode={effectiveMode}
            paymentMethod={paymentMethod}
            notes={notes}
            onModeChange={setMode}
            onPaymentChange={setPaymentMethod}
            onNotesChange={setNotes}
          />
        </div>
        <aside className="lg:col-span-2">
          <div className="sticky top-24 space-y-4">
            <BookingSummaryCard
              doctorName={resolved.doctorName || 'Doctor'}
              serviceName={resolved.serviceName || 'Consultation'}
              price={resolved.price ?? 0}
              date={resolved.date}
              timeSlot={formatTimeLabel(resolved.timeSlot)}
            />
            <Button
              type="button"
              onClick={handleBook}
              disabled={isPending}
              className="w-full py-3.5"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Spinner className="h-4 w-4" />
                  {t('booking.booking')}
                </span>
              ) : (
                t('booking.confirm_booking')
              )}
            </Button>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
