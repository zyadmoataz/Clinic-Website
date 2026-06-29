import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  onBookNow: () => void;
}

export function HeroSection({ onBookNow }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="bg-bg duration-normal relative overflow-hidden py-20 transition-colors">
      <div className="container-main relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col items-start space-y-6">
          <span className="bg-primary-soft text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
            <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
            {t('hero.eyebrow', 'Modern Healthcare')}
          </span>
          <h1 className="text-text text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            {t('hero.title', 'Care, Booked Simply')}
          </h1>
          <p className="text-muted max-w-lg text-lg">
            {t(
              'hero.description',
              'Browse top doctors, view real-time availability, and schedule your appointment in seconds.'
            )}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" onClick={onBookNow}>
              {t('hero.cta', 'Book Appointment')}
            </Button>
          </div>
        </div>
        <div className="hidden lg:block">
          {/* Visual card representing high quality design */}
          <div className="glass border-border rounded-lg border p-8 shadow-lg">
            <div className="bg-primary-soft text-primary flex h-64 items-center justify-center rounded font-bold">
              [ {t('hero.illustrationPlaceholder', 'Premium Clinic UI Preview')} ]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
