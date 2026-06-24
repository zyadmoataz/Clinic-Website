// ==========================================
// OWNER: Omar
// PURPOSE: Doctor Discovery - Browse & filter active doctors
// ==========================================
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, UserSearch, ChevronDown } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SectionHeader } from '../components/sections/SectionHeader';
import { DoctorCard } from '../components/cards/DoctorCard';
import { LoadingState } from '../components/feedback/LoadingState';
import { ErrorState } from '../components/feedback/ErrorState';
import { EmptyState } from '../components/feedback/EmptyState';
import { useDoctorsQuery } from '../services/api/queries/doctors.query';

export default function DoctorsList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: doctors, isLoading, isError, refetch } = useDoctorsQuery();

  const [search, setSearch] = useState('');
  const [specialization, setSpecialization] = useState('');

  const specializations = useMemo(() => {
    const set = new Set<string>();
    (doctors ?? []).forEach((d) => {
      if (d.specialization) set.add(d.specialization);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [doctors]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (doctors ?? []).filter((d) => {
      const matchesSpecialization = !specialization || d.specialization === specialization;
      const matchesSearch =
        !term ||
        d.displayName.toLowerCase().includes(term) ||
        (d.specialization ?? '').toLowerCase().includes(term);
      return matchesSpecialization && matchesSearch;
    });
  }, [doctors, search, specialization]);

  return (
    <PageContainer className="py-10 md:py-14">
      <SectionHeader
        title={t('doctors.list_title', 'Find Your Doctor')}
        subtitle={t(
          'doctors.list_subtitle',
          'Browse our specialists, check their availability, and book the right care in minutes.'
        )}
      />

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="text-faint pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('doctors.search_placeholder', 'Search by name or specialty…')}
            aria-label={t('doctors.search_placeholder', 'Search by name or specialty…')}
            className="bg-surface-2 text-text placeholder:text-faint focus:bg-surface w-full rounded-2xl border-none py-3.5 ps-12 pe-5 text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.15)] focus:outline-none"
          />
        </div>

        <div className="relative sm:w-64">
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            aria-label={t('doctors.filter_specialty', 'Filter by specialty')}
            className="bg-surface-2 text-text focus:bg-surface w-full cursor-pointer appearance-none rounded-2xl border-none py-3.5 ps-5 pe-12 text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.15)] focus:outline-none"
          >
            <option value="">{t('doctors.all_specialties', 'All specialties')}</option>
            {specializations.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown className="text-faint pointer-events-none absolute end-4 top-1/2 h-5 w-5 -translate-y-1/2" />
        </div>
      </div>

      {/* Content states */}
      {isLoading && <LoadingState message={t('doctors.loading', 'Loading doctors…')} />}

      {isError && !isLoading && (
        <ErrorState
          message={t('doctors.error', 'We could not load the doctors list right now.')}
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <EmptyState
          icon={<UserSearch className="h-6 w-6" />}
          title={t('doctors.empty_title', 'No doctors found')}
          description={t(
            'doctors.empty_desc',
            'Try adjusting your search keywords or clearing the specialty filter.'
          )}
        />
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <>
          <p className="text-muted mb-4 text-sm">
            {t('doctors.results_count', '{{count}} doctor(s) available', {
              count: filtered.length
            })}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                viewLabel={t('doctors.view_profile', 'View Profile')}
                bookLabel={t('doctors.book_now', 'Book Now')}
                onView={() => navigate(`/doctors/${doctor.id}`)}
                onBook={() => navigate(`/doctors/${doctor.id}`)}
              />
            ))}
          </div>
        </>
      )}
    </PageContainer>
  );
}
