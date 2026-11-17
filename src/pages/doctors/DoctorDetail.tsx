import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { LoadingState } from '@/components/feedback/LoadingState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { EmptyState } from '@/components/feedback/EmptyState';
import { useDoctorQuery, useDoctorSlotsQuery } from '@/api/queries/doctors.query';
import { useAuthStore } from '@/store/authStore';
import { useBookingDraftStore } from '@/store/bookingDraftStore';
import { buildBookingUrl } from '@/utils/safeRedirect';
import { DoctorProfileHeader } from '@/features/doctors/DoctorProfileHeader';
import { DoctorPracticeDetails } from '@/features/doctors/DoctorPracticeDetails';
import { SlotSchedulePanel } from '@/features/doctors/SlotSchedulePanel';

export default function DoctorDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setBookingDraft = useBookingDraftStore((s) => s.setDraft);

  const { data: doctor, isLoading, isError, refetch } = useDoctorQuery(id);

  const [manualServiceId, setManualServiceId] = useState<number | null>(null);
  const [manualDate, setManualDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectedServiceId = manualServiceId ?? doctor?.services[0]?.id ?? null;
  const selectedDate = manualDate ?? doctor?.nearestAvailableDates[0] ?? null;

  const {
    data: slots,
    isLoading: slotsLoading,
    isError: slotsError,
    refetch: refetchSlots
  } = useDoctorSlotsQuery(id, selectedDate, selectedServiceId);

  const selectedService = useMemo(
    () => doctor?.services.find((s) => s.id === selectedServiceId) ?? null,
    [doctor, selectedServiceId]
  );

  const handleContinue = () => {
    if (!doctor || !selectedService || !selectedDate || !selectedTime) return;
    const draft = {
      doctorId: doctor.id,
      doctorName: doctor.displayName,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      price: selectedService.price,
      date: selectedDate,
      timeSlot: selectedTime
    };
    setBookingDraft(draft);
    const targetUrl = buildBookingUrl(draft);
    navigate(isAuthenticated ? targetUrl : `/login?redirect=${encodeURIComponent(targetUrl)}`, {
      state: isAuthenticated ? draft : undefined
    });
  };

  if (isLoading) {
    return (
      <PageContainer className="py-10">
        <LoadingState count={3} message={t('doctors.detail_loading')} />
      </PageContainer>
    );
  }

  if (isError || !doctor) {
    return (
      <PageContainer className="py-10">
        <ErrorState message={t('doctors.detail_error')} onRetry={() => refetch()} />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-8 md:py-12">
      <Link
        to="/doctors"
        className="text-muted hover:text-primary mb-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {t('doctors.back_to_list')}
      </Link>

      <DoctorProfileHeader doctor={doctor} />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5">
        <div className="space-y-8 lg:col-span-3">
          <section>
            <SectionHeader
              title={t('doctors.services_title')}
              subtitle={t('doctors.services_subtitle')}
            />
            {doctor.services.length === 0 ? (
              <EmptyState
                icon={<Briefcase className="h-6 w-6" />}
                title={t('doctors.no_services_title')}
                description={t('doctors.no_services_desc')}
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {doctor.services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    selected={selectedServiceId === service.id}
                    onClick={() => {
                      setManualServiceId(service.id);
                      setSelectedTime(null);
                    }}
                  />
                ))}
              </div>
            )}
          </section>

          <DoctorPracticeDetails doctor={doctor} />
        </div>

        <section className="lg:col-span-2">
          <SlotSchedulePanel
            doctor={doctor}
            selectedService={selectedService}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            slots={slots}
            slotsLoading={slotsLoading}
            slotsError={slotsError}
            isAuthenticated={isAuthenticated}
            onSelectDate={(d) => {
              setManualDate(d);
              setSelectedTime(null);
            }}
            onSelectTime={setSelectedTime}
            onRetrySlots={() => refetchSlots()}
            onContinue={handleContinue}
          />
        </section>
      </div>
    </PageContainer>
  );
}
