// ==========================================
// OWNER: Othman
// ==========================================
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui';
import { FeatureCard } from '../components/cards/FeatureCard';
import { PageContainer } from '../components/layout/PageContainer';
import {
  Bone,
  Brain,
  ClipboardPlus,
  HeartPulse,
  Microscope,
  Stethoscope,
  BadgeCheck,
  Smile,
  Heart,
  Clock,
  Activity
} from 'lucide-react';
import { TestimonialCard } from '../components/cards/TestimonialCard';
import InfoCard from '@/components/cards/InfoCard';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <PageContainer>
        <section className="flex flex-col items-center justify-between gap-12 py-12 md:py-20 lg:flex-row lg:gap-20 lg:py-24">
          <section className="animate-in fade-in slide-in-from-bottom-8 flex-1 duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
            <div className="text-primary border-primary/20 bg-primary/10 mb-6 flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold">
              <BadgeCheck className="h-4 w-4" /> Top-Rated Care
            </div>

            <h1 className="text-text mb-6 w-full text-4xl leading-tight font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              {t('home.hero.hero_title')}
              <span className="text-primary">{t('home.hero.hero_title-colored')}.</span>
            </h1>

            <p className="text-muted mb-2 max-w-xl text-lg font-medium md:text-xl">
              {t('home.hero.hero_subtitle1')}
            </p>
            <p className="text-muted mb-10 max-w-xl text-lg md:text-xl">
              {t('home.hero.hero_subtitle2')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="hover:shadow-glow h-12 rounded-full px-8 text-lg shadow-md hover:-translate-y-1">
                {t('home.hero.main-cta')} →
              </Button>
              <Button className="h-12 rounded-full px-8 text-lg" variant="secondary">
                {t('home.hero.sec-cta')} →
              </Button>
            </div>
          </section>
          <section className="animate-in fade-in slide-in-from-right-8 flex w-full max-w-2xl flex-1 items-center justify-center delay-300 duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
            <div className="shadow-glow ring-border/50 relative aspect-square w-full overflow-hidden rounded-[2rem] ring-1 transition-transform duration-700 hover:-translate-y-2 hover:shadow-lg lg:aspect-auto lg:h-[75vh]">
              <img
                className="h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-105"
                src="/images/hero-img.jpg"
                alt="The clinic receptionist"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"></div>
            </div>
          </section>
        </section>
      </PageContainer>

      {/* Metrics */}
      <section className="bg-surface-2 border-y-border/50 relative overflow-hidden border-y py-12 md:py-16">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 lg:grid-cols-4">
          <div className="group lg:border-border/50 flex flex-col items-center justify-center transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 lg:border-r">
            <p className="text-primary mb-2 text-4xl font-bold tracking-tight transition-transform duration-[300ms] group-hover:scale-110 md:text-5xl">
              {t('home.metrics.patients')}
            </p>
            <p className="text-muted text-xs font-semibold tracking-wider uppercase md:text-sm">
              {t('home.metrics.patients-text')}
            </p>
          </div>
          <div className="group lg:border-border/50 flex flex-col items-center justify-center transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 lg:border-r">
            <p className="text-primary mb-2 text-4xl font-bold tracking-tight transition-transform duration-[300ms] group-hover:scale-110 md:text-5xl">
              {t('home.metrics.specialists')}
            </p>
            <p className="text-muted text-center text-xs font-semibold tracking-wider uppercase md:text-sm">
              {t('home.metrics.specialists-text')}
            </p>
          </div>
          <div className="group lg:border-border/50 flex flex-col items-center justify-center transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 lg:border-r">
            <p className="text-primary mb-2 text-4xl font-bold tracking-tight transition-transform duration-[300ms] group-hover:scale-110 md:text-5xl">
              {t('home.metrics.experience')}
            </p>
            <p className="text-muted text-center text-xs font-semibold tracking-wider uppercase md:text-sm">
              {t('home.metrics.experience-text')}
            </p>
          </div>
          <div className="group flex flex-col items-center justify-center transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1">
            <p className="text-primary mb-2 text-4xl font-bold tracking-tight transition-transform duration-[300ms] group-hover:scale-110 md:text-5xl">
              {t('home.metrics.rating')}
            </p>
            <p className="text-muted text-xs font-semibold tracking-wider uppercase md:text-sm">
              {t('home.metrics.rating-text')}
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <PageContainer className="py-16 md:py-24">
        <section className="animate-in fade-in slide-in-from-bottom-8 mb-16 flex flex-col items-center justify-center duration-700">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {t('home.whyUs.whyUs-title')}
          </h2>
          <p className="text-muted max-w-2xl text-center text-lg">
            {t('home.whyUs.whyUs-subtitle')}
          </p>
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-12 grid grid-cols-1 gap-6 delay-200 duration-700 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <InfoCard
            icon={<Microscope className="text-primary h-6 w-6" />}
            title={t('home.whyUs.whyUs-card1-title')}
            text={t('home.whyUs.whyUs-card1-text')}
            variant="primary"
            className="lg:col-span-2"
          />

          {/* Card 2 */}
          <InfoCard
            icon={<Heart className="text-success h-6 w-6" />}
            title={t('home.whyUs.whyUs-card2-title')}
            text={t('home.whyUs.whyUs-card2-text')}
            variant="success"
          />

          {/* Card 3 */}
          <InfoCard
            icon={<Clock className="text-warning h-6 w-6" />}
            title={t('home.whyUs.whyUs-card3-title')}
            text={t('home.whyUs.whyUs-card3-text')}
            variant="warning"
          />

          {/* Card 4 */}
          <InfoCard
            icon={<Activity className="text-primary h-6 w-6" />}
            title={t('home.whyUs.whyUs-card4-title')}
            text={t('home.whyUs.whyUs-card4-text')}
            variant="primary"
            className="lg:col-span-2"
          />
        </section>
      </PageContainer>

      {/* Our Services */}
      <section className="bg-surface-2 relative py-16 md:py-24">
        <PageContainer>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              {t('home.services.services-title')}
            </h2>
            <p className="text-muted text-lg">{t('home.services.services-subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Stethoscope className="h-6 w-6" />}
              title={t('home.services.service1-title')}
              desc={t('home.services.service1-desc')}
            />
            <FeatureCard
              icon={<HeartPulse className="h-6 w-6" />}
              title={t('home.services.service2-title')}
              desc={t('home.services.service2-desc')}
            />
            <FeatureCard
              icon={<ClipboardPlus className="h-6 w-6" />}
              title={t('home.services.service3-title')}
              desc={t('home.services.service3-desc')}
            />
            <FeatureCard
              icon={<Brain className="h-6 w-6" />}
              title={t('home.services.service4-title')}
              desc={t('home.services.service4-desc')}
            />
            <FeatureCard
              icon={<Smile className="h-6 w-6" />}
              title={t('home.services.service5-title')}
              desc={t('home.services.service5-desc')}
            />
            <FeatureCard
              icon={<Bone className="h-6 w-6" />}
              title={t('home.services.service6-title')}
              desc={t('home.services.service6-desc')}
            />
          </div>
        </PageContainer>
      </section>

      {/* Patient Stories */}
      <PageContainer className="py-16 md:py-24">
        <section className="mb-16 flex flex-col items-center justify-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {t('home.testimonial.testimonial-title')}
          </h2>
          <p className="text-muted max-w-2xl text-center text-lg">
            {t('home.testimonial.testimonial-subtitle')}
          </p>
        </section>

        <section className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          <TestimonialCard
            name={t('home.testimonial.testimonial-card1-title')}
            comment={t('home.testimonial.testimonial-card1-text')}
            rating={5}
          />
          <TestimonialCard
            name={t('home.testimonial.testimonial-card2-title')}
            comment={t('home.testimonial.testimonial-card2-text')}
            rating={5}
          />
          <TestimonialCard
            name={t('home.testimonial.testimonial-card3-title')}
            comment={t('home.testimonial.testimonial-card3-text')}
            rating={5}
          />
        </section>
      </PageContainer>
    </>
  );
}
