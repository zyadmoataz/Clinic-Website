// ==========================================
// OWNER: Othman
// ==========================================
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui';
import { FeatureCard } from '../components/cards/FeatureCard';
import { PageContainer } from '../components/layout/PageContainer';
import { Bone, Brain, ClipboardPlus, HeartPulse, Stethoscope } from 'lucide-react';
import { RiVerifiedBadgeLine } from 'react-icons/ri';
import { TbDental } from 'react-icons/tb';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <PageContainer>
        <section className="flex h-screen items-center justify-between gap-[5rem]">
          <section className="flex-1">
            <div className="text-primary border-primary-ring bg-primary-soft mb-[1rem] flex w-fit items-center gap-[.3rem] rounded-full border px-[1rem] py-[.3rem]">
              <RiVerifiedBadgeLine /> Top-Rated Care
            </div>

            <h1 className="text-text mb-6 w-[95%] text-4xl leading-tight font-[700] tracking-tighter md:text-5xl lg:text-6xl">
              {t('home.hero.hero_title')}
              <span className="text-primary">{t('home.hero.hero_title-colored')}.</span>
            </h1>

            <p className="text-muted text-lg md:text-xl">{t('home.hero.hero_subtitle1')}</p>
            <p className="text-muted mb-10 w-[80%] text-lg md:text-xl">
              {t('home.hero.hero_subtitle2')}
            </p>

            <div className="flex gap-[2rem]">
              <Button className="h-12 rounded-full px-8 text-lg">
                {t('home.hero.main-cta')} →
              </Button>
              <Button className="h-12 rounded-full px-8 text-lg" variant="secondary">
                {t('home.hero.sec-cta')} →
              </Button>
            </div>
          </section>
          <section className="flex h-[75%] w-[90%] flex-1 items-center justify-center rounded-[1rem] shadow-2xl">
            <img
              className="h-full w-full rounded-[1rem]"
              src="/images/hero-img.jpg"
              alt="The clinic receptionist"
            />
          </section>
        </section>
      </PageContainer>

      {/* Metrics */}
      <section className="bg-border border-y-border-strong mb-16 border-y py-[2rem]">
        <div className="item-center container mx-auto flex justify-between px-[1rem]">
          <div className="border-r-border-strong flex flex-1 flex-col items-center justify-center border-r">
            <p className="text-primary text-[2.5rem] font-[600]">{t('home.metrics.patients')}</p>
            <p className="font-[300] tracking-wider uppercase">{t('home.metrics.patients-text')}</p>
          </div>
          <div className="border-r-border-strong flex flex-1 flex-col items-center justify-center border-r">
            <p className="text-primary text-[2.5rem] font-[600]">{t('home.metrics.specialists')}</p>
            <p className="font-[300] tracking-wider uppercase">
              {t('home.metrics.specialists-text')}
            </p>
          </div>
          <div className="border-r-border-strong flex flex-1 flex-col items-center justify-center border-r">
            <p className="text-primary text-[2.5rem] font-[600]">{t('home.metrics.experience')}</p>
            <p className="font-[300] tracking-wider uppercase">
              {t('home.metrics.experience-text')}
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-primary text-[2.5rem] font-[600]">{t('home.metrics.rating')}</p>
            <p className="font-[300] tracking-wider uppercase">{t('home.metrics.rating-text')}</p>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <PageContainer>
        <div>
          <h2 className="text-[2rem] font-[600]">{t('home.services.services-title')}</h2>
          <p className="mb-[3rem] text-[1.125rem] font-[300]">
            {t('home.services.services-subtitle')}
          </p>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-8 grid grid-cols-1 gap-6 duration-700 md:grid-cols-3">
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
            icon={<TbDental className="h-6 w-6" />}
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
    </>
  );
}
