import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserSearch } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { DoctorCard } from '@/components/cards/DoctorCard';
import { DoctorsFilterBar } from '@/features/doctors/DoctorsFilterBar';
import { DoctorsAssuranceFooter, DoctorsSummaryStrip } from '@/features/doctors/DoctorsTrustStrip';
import { LoadingState } from '@/components/feedback/LoadingState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { EmptyState } from '@/components/feedback/EmptyState';
import { Button } from '@/components/ui';
import { useDoctorsQuery } from '@/api/queries/doctors.query';
import { buildBookingUrl } from '@/utils/safeRedirect';

export default function DoctorsList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const specialization = searchParams.get('specialization') || '';
  const mode = searchParams.get('mode') || '';
  const sort = searchParams.get('sort') || 'rating';

  const { data: doctors, isLoading, isError, refetch } = useDoctorsQuery();

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  const specializations = useMemo(() => {
    const set = new Set<string>();
    (doctors ?? []).forEach((d) => d.specialization && set.add(d.specialization));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [doctors]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = (doctors ?? []).filter((d) => {
      if (specialization && d.specialization !== specialization) return false;
      if (mode === 'online' && !d.supportsOnline) return false;
      if (!term) return true;
      return `${d.displayName} ${d.specialization} ${d.bio ?? ''}`.toLowerCase().includes(term);
    });
    return [...list].sort((a, b) => {
      if (sort === 'experience') return b.yearsExperience - a.yearsExperience;
      if (sort === 'fee') {
        const minA = Math.min(...a.services.map((s) => s.price), 9999);
        const minB = Math.min(...b.services.map((s) => s.price), 9999);
        return minA - minB;
      }
      return b.rating - a.rating;
    });
  }, [doctors, search, specialization, mode, sort]);

  return (
    <PageContainer className="py-10 md:py-12">
      <SectionHeader title={t('doctors.list_title')} subtitle={t('doctors.list_subtitle')} />

      {!isLoading && !isError && doctors && <DoctorsSummaryStrip doctors={doctors} />}

      <DoctorsFilterBar
        search={search}
        specialization={specialization}
        mode={mode}
        sort={sort}
        specializations={specializations}
        onUpdate={updateParam}
      />

      {isLoading && <LoadingState variant="doctors" count={6} message={t('doctors.loading')} />}
      {isError && !isLoading && (
        <ErrorState message={t('doctors.error')} onRetry={() => refetch()} />
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <EmptyState
          icon={<UserSearch className="h-6 w-6" />}
          title={t('doctors.empty_title')}
          description={t('doctors.empty_desc')}
          action={
            <Button variant="secondary" onClick={() => setSearchParams({}, { replace: true })}>
              {t('doctors.clear_filters')}
            </Button>
          }
        />
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <>
          <p className="text-muted mb-4 text-xs font-bold tracking-wider uppercase">
            {t('doctors.results_count', { count: filtered.length })}
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                bookLabel={t('doctors.book_now')}
                onBook={() => navigate(`/doctors/${doctor.id}`)}
                onQuickBook={
                  doctor.nextAvailableDate && doctor.nextAvailableSlot && doctor.services[0]
                    ? () =>
                        navigate(
                          buildBookingUrl({
                            doctorId: doctor.id,
                            serviceId: doctor.services[0].id,
                            date: doctor.nextAvailableDate!,
                            timeSlot: doctor.nextAvailableSlot!
                          })
                        )
                    : undefined
                }
              />
            ))}
          </div>
          <DoctorsAssuranceFooter />
        </>
      )}
    </PageContainer>
  );
}
