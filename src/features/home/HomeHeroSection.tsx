import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, BadgeCheck, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';
import { PageContainer } from '@/components/layout/PageContainer';
import { HeroTicketPreviewCard } from './HeroTicketPreviewCard';

export function HomeHeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/doctors?search=${encodeURIComponent(q)}` : '/doctors');
  };

  return (
    <section className="hero-mesh relative overflow-hidden">
      <div
        aria-hidden="true"
        className="hero-dot-grid pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden="true"
        className="bg-primary/10 animate-aurora pointer-events-none absolute -start-20 -top-24 h-72 w-72 rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-accent/10 animate-aurora pointer-events-none absolute -end-16 -bottom-24 h-72 w-72 rounded-full blur-3xl"
        style={{ animationDelay: '-5s' }}
      />

      <PageContainer className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 py-10 md:py-16 lg:grid-cols-12 lg:gap-12">
          <div className="animate-fade-up lg:col-span-7">
            <div className="bg-surface/90 border-border text-primary mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold shadow-sm backdrop-blur-sm">
              <span className="bg-success h-2 w-2 animate-pulse rounded-full" />
              <BadgeCheck className="h-4 w-4" />
              {t('home.hero.badge')}
            </div>

            <h1 className="text-text mb-5 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {t('home.hero.hero_title')}
              <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
                {t('home.hero.hero_title-colored')}.
              </span>
            </h1>

            <p className="text-muted mb-7 max-w-xl text-base leading-relaxed sm:text-lg">
              {t('home.hero.hero_subtitle1')} {t('home.hero.hero_subtitle2')}
            </p>

            <form
              onSubmit={handleQuickSearch}
              className="bg-surface/95 border-border focus-within:border-primary focus-within:ring-primary-ring mb-5 flex max-w-xl flex-col gap-2 rounded-2xl border p-2 shadow-md backdrop-blur-md transition-all focus-within:ring-2 sm:flex-row sm:items-center"
            >
              <label className="flex flex-1 cursor-text items-center gap-2.5 ps-2.5">
                <Search className="text-faint h-4 w-4 shrink-0" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('doctors.search_placeholder')}
                  aria-label={t('doctors.search_placeholder')}
                  className="text-text placeholder:text-faint w-full min-w-0 bg-transparent py-2.5 pe-2 text-sm focus:outline-none"
                />
              </label>
              <Button type="submit" className="gap-2 rounded-xl px-5 py-2.5 text-sm">
                {t('home.hero.main-cta')}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </form>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted inline-flex items-center gap-1 text-xs font-semibold">
                <Sparkles className="text-accent h-3.5 w-3.5" />
                {t('home.hero.quick_label', 'Quick:')}
              </span>
              {[
                { key: 'Cardiology', label: t('home.services.service2-title', 'Cardiology') },
                { key: 'Dermatology', label: t('doctors.spec_dermatology', 'Dermatology') },
                { key: 'Pediatrics', label: t('home.services.service3-title', 'Pediatrics') },
                { key: 'Neurology', label: t('home.services.service4-title', 'Neurology') }
              ].map((spec) => (
                <button
                  key={spec.key}
                  type="button"
                  onClick={() =>
                    navigate(`/doctors?specialization=${encodeURIComponent(spec.key)}`)
                  }
                  className="bg-surface border-border text-muted hover:border-primary/40 hover:text-primary cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
                >
                  {spec.label}
                </button>
              ))}
            </div>
          </div>

          <HeroTicketPreviewCard />
        </div>
      </PageContainer>
    </section>
  );
}
