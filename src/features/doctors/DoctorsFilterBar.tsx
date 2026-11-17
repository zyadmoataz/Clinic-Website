import { Monitor } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SearchInput, Select } from '@/components/ui';

interface DoctorsFilterBarProps {
  search: string;
  specialization: string;
  mode: string;
  sort: string;
  specializations: string[];
  onUpdate: (key: string, value: string) => void;
}

export function DoctorsFilterBar({
  search,
  specialization,
  mode,
  sort,
  specializations,
  onUpdate
}: DoctorsFilterBarProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchInput
          value={search}
          onChange={(val) => onUpdate('search', val)}
          placeholder={t('doctors.search_placeholder')}
          className="flex-1"
        />
        <div className="grid grid-cols-2 gap-3 sm:flex">
          <div className="sm:w-44">
            <Select
              aria-label={t('doctors.sort_label', 'Sort doctors')}
              value={sort}
              onChange={(e) => onUpdate('sort', e.target.value)}
              options={[
                { value: 'rating', label: t('doctors.sort_rating', 'Top Rated') },
                { value: 'fee', label: t('doctors.sort_fee', 'Lowest Fee') },
                { value: 'experience', label: t('doctors.sort_experience', 'Most Experienced') }
              ]}
            />
          </div>
          <button
            type="button"
            onClick={() => onUpdate('mode', mode === 'online' ? '' : 'online')}
            aria-pressed={mode === 'online'}
            className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
              mode === 'online'
                ? 'border-primary bg-primary-soft text-primary'
                : 'border-border bg-surface text-muted hover:text-text'
            }`}
          >
            <Monitor className="h-4 w-4" />
            {t('doctors.telehealth_only')}
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onUpdate('specialization', '')}
          className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            !specialization
              ? 'border-primary bg-primary text-on-primary'
              : 'border-border bg-surface text-muted hover:text-text'
          }`}
        >
          {t('doctors.all_specialties')}
        </button>
        {specializations.map((spec) => (
          <button
            key={spec}
            type="button"
            onClick={() => onUpdate('specialization', specialization === spec ? '' : spec)}
            className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              specialization === spec
                ? 'border-primary bg-primary text-on-primary'
                : 'border-border bg-surface text-muted hover:text-text'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>
    </>
  );
}
