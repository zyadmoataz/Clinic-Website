import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CalendarCheck2, ShieldCheck } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function HomeCtaSection() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.15);

  return (
    <PageContainer className="pb-16">
      <div
        ref={ref}
        className={`from-primary via-primary-hover reveal relative overflow-hidden rounded-3xl bg-gradient-to-br to-[#1e3a8a] px-6 py-10 text-white shadow-lg sm:px-10 md:py-12 ${
          isVisible ? 'is-visible' : ''
        }`}
      >
        <div
          aria-hidden="true"
          className="hero-dot-grid pointer-events-none absolute inset-0 opacity-20"
        />
        <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              {t('home.cta.badge', 'Instant Ticket Reservation')}
            </span>
            <h2 className="mb-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              {t('home.cta.title', 'Book Your Specialist Ticket in Under 60 Seconds')}
            </h2>
            <p className="text-sm leading-relaxed text-white/80 sm:text-base">
              {t(
                'home.cta.subtitle',
                'Compare open clinic times and transparent visit pricing freely—only sign in when you confirm your QR pass.'
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/doctors"
              className="text-primary inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold shadow-md transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              <CalendarCheck2 className="h-4 w-4" />
              {t('home.hero.main-cta')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <Link
              to="/my-appointments"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              {t('navbar.appointments')}
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
