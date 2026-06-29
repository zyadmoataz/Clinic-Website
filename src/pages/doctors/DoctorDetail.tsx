import { useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Star,
  Stethoscope,
  Briefcase,
  CalendarDays,
  Clock,
  CalendarX
} from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { LoadingState } from '@/components/feedback/LoadingState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { EmptyState } from '@/components/feedback/EmptyState';
import { useDoctorQuery, useDoctorSlotsQuery } from '@/api/queries/doctors.query';
import { formatDate } from '@/utils/formatDate';
import { formatTimeLabel } from '@/utils/formatTimeLabel';
import i18n from '@/i18n';

function getInitials(name: string): string {
  const cleaned = name.replace(/^dr\.?\s*/i, '').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'DR';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function shortDate(date: string): { weekday: string; day: string; month: string } {
  const d = new Date(date);
  const lang = i18n.language || 'en';
  const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
  return {
    weekday: d.toLocaleDateString(locale, { weekday: 'short' }),
    day: d.toLocaleDateString(locale, { day: 'numeric' }),
    month: d.toLocaleDateString(locale, { month: 'short' })
  };
}

export default function DoctorDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: doctor, isLoading, isError, refetch } = useDoctorQuery(id);

  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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

  const canContinue = !!(selectedService && selectedDate && selectedTime);

  const handleContinue = () => {
    if (!doctor || !selectedService || !selectedDate || !selectedTime) return;
    navigate('/booking', {
      state: {
        doctorId: doctor.id,
        doctorName: doctor.displayName,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        price: selectedService.price,
        date: selectedDate,
        timeSlot: selectedTime
      }
    });
  };

  if (isLoading) {
    return (
      <PageContainer className="py-10 md:py-14">
        <LoadingState message={t('doctors.detail_loading', 'Loading doctor profile…')} />
      </PageContainer>
    );
  }

  if (isError || !doctor) {
    return (
      <PageContainer className="py-10 md:py-14">
        <ErrorState
          message={t('doctors.detail_error', 'We could not load this doctor profile.')}
          onRetry={() => refetch()}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-8 md:py-12">
      <Link
        to="/doctors"
        className="text-muted hover:text-primary mb-6 inline-flex items-center gap-2 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {t('doctors.back_to_list', 'Back to all doctors')}
      </Link>

      {/* Profile header */}
      <header className="bg-surface border-border mb-10 flex flex-col gap-6 rounded-3xl border p-6 shadow-sm sm:flex-row sm:items-center md:p-8">
        <div className="border-primary-soft h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 shadow-sm">
          {doctor.photoUrl ? (
            <img
              src={doctor.photoUrl}
              alt={`Portrait of ${doctor.displayName}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="bg-primary-soft text-primary flex h-full w-full items-center justify-center text-3xl font-bold">
              {getInitials(doctor.displayName)}
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-text text-2xl font-bold tracking-tight sm:text-3xl">
            {doctor.displayName}
          </h1>
          <p className="text-primary mt-1 flex items-center gap-1.5 text-sm font-semibold">
            <Stethoscope className="h-4 w-4" />
            {doctor.specialization || t('doctors.general_practice', 'General Practice')}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {doctor.rating > 0 && (
              <Badge className="bg-warning-soft text-warning gap-1">
                <Star className="h-3 w-3 fill-current" />
                {doctor.rating.toFixed(1)}
                <span className="text-warning/70 font-normal">({doctor.reviewCount})</span>
              </Badge>
            )}
            {doctor.yearsExperience > 0 && (
              <Badge className="bg-primary-soft text-primary gap-1">
                <Briefcase className="h-3 w-3" />
                {t('doctors.years_experience', '{{count}} yrs experience', {
                  count: doctor.yearsExperience
                })}
              </Badge>
            )}
          </div>

          {doctor.bio && (
            <p className="text-muted mt-4 max-w-2xl text-sm leading-relaxed">{doctor.bio}</p>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
        {/* Services */}
        <section className="lg:col-span-3">
          <SectionHeader
            title={t('doctors.services_title', 'Services & Specialties')}
            subtitle={t('doctors.services_subtitle', 'Select a service to check available times.')}
          />

          {doctor.services.length === 0 ? (
            <EmptyState
              icon={<Briefcase className="h-6 w-6" />}
              title={t('doctors.no_services_title', 'No services listed')}
              description={t(
                'doctors.no_services_desc',
                'This doctor has not published bookable services yet.'
              )}
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {doctor.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selected={selectedServiceId === service.id}
                  onClick={() => {
                    setSelectedServiceId(service.id);
                    setSelectedDate(null);
                    setSelectedTime(null);
                  }}
                />
              ))}
            </div>
          )}
        </section>

        {/* Scheduling */}
        <section className="lg:col-span-2">
          <div className="bg-surface border-border sticky top-24 rounded-3xl border p-6 shadow-sm">
            <h2 className="text-text mb-1 flex items-center gap-2 text-lg font-bold">
              <CalendarDays className="text-primary h-5 w-5" />
              {t('doctors.schedule_title', 'Check Availability')}
            </h2>
            <p className="text-muted mb-5 text-sm">
              {t('doctors.schedule_subtitle', 'Pick a date, then choose a free time slot.')}
            </p>

            {!selectedService ? (
              <div className="border-border-strong text-muted rounded-2xl border border-dashed px-4 py-10 text-center text-sm">
                {t(
                  'doctors.select_service_first',
                  'Select a service above to see available dates.'
                )}
              </div>
            ) : (
              <>
                {/* Dates */}
                <p className="text-text mb-2 text-xs font-semibold tracking-wider uppercase">
                  {t('doctors.available_dates', 'Available dates')}
                </p>
                {doctor.nearestAvailableDates.length === 0 ? (
                  <EmptyState
                    icon={<CalendarX className="h-6 w-6" />}
                    title={t('doctors.no_dates_title', 'No upcoming dates')}
                    description={t(
                      'doctors.no_dates_desc',
                      'Please check back later for openings.'
                    )}
                  />
                ) : (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {doctor.nearestAvailableDates.map((date) => {
                      const parts = shortDate(date);
                      const active = selectedDate === date;
                      return (
                        <button
                          key={date}
                          type="button"
                          onClick={() => {
                            setSelectedDate(date);
                            setSelectedTime(null);
                          }}
                          className={`flex w-16 flex-col items-center rounded-xl border px-2 py-2 text-center transition-all duration-[200ms] ${
                            active
                              ? 'border-primary bg-primary text-on-primary shadow-md'
                              : 'border-border bg-surface-2 text-text hover:border-primary/40'
                          }`}
                        >
                          <span className="text-[11px] font-medium opacity-80">
                            {parts.weekday}
                          </span>
                          <span className="text-lg leading-tight font-bold">{parts.day}</span>
                          <span className="text-[11px] font-medium opacity-80">{parts.month}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Time slots */}
                {selectedDate && (
                  <div>
                    <p className="text-text mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
                      <Clock className="h-3.5 w-3.5" />
                      {t('doctors.available_times', 'Available times')}
                    </p>

                    {slotsLoading && (
                      <div className="flex items-center justify-center gap-2 py-8">
                        <Spinner className="text-primary h-5 w-5" />
                        <span className="text-muted text-sm">
                          {t('doctors.loading_slots', 'Loading slots…')}
                        </span>
                      </div>
                    )}

                    {slotsError && !slotsLoading && (
                      <ErrorState
                        message={t('doctors.slots_error', 'Could not load time slots.')}
                        onRetry={() => refetchSlots()}
                      />
                    )}

                    {!slotsLoading && !slotsError && (slots?.length ?? 0) === 0 && (
                      <EmptyState
                        icon={<CalendarX className="h-6 w-6" />}
                        title={t('doctors.no_slots_title', 'Fully booked')}
                        description={t(
                          'doctors.no_slots_desc',
                          'No free slots on this date. Try another day.'
                        )}
                      />
                    )}

                    {!slotsLoading && !slotsError && (slots?.length ?? 0) > 0 && (
                      <div className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto pe-1">
                        {slots!.map((time) => {
                          const active = selectedTime === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`rounded-lg border py-2 text-sm font-medium transition-all duration-[200ms] ${
                                active
                                  ? 'border-primary bg-primary text-on-primary shadow-sm'
                                  : 'border-border bg-surface-2 text-text hover:border-primary/40'
                              }`}
                            >
                              {formatTimeLabel(time)}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Summary + CTA */}
                <div className="border-border mt-6 border-t pt-5">
                  {canContinue && (
                    <div className="text-muted mb-4 space-y-1 text-sm">
                      <p className="text-text font-semibold">{selectedService!.name}</p>
                      <p>{formatDate(selectedDate!)}</p>
                      <p>{formatTimeLabel(selectedTime!)}</p>
                      <p className="text-primary font-semibold">{selectedService!.price} EGP</p>
                    </div>
                  )}
                  <Button
                    type="button"
                    disabled={!canContinue}
                    onClick={handleContinue}
                    className="w-full"
                  >
                    {t('doctors.continue_to_booking', 'Continue to Booking')}
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
