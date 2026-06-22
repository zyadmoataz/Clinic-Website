// ==========================================
// OWNER: Othman
// ==========================================
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui';
import { FeatureCard } from '../components/cards/FeatureCard';
import { PageContainer } from '../components/layout/PageContainer';
import { Calendar, CreditCard, Stethoscope } from 'lucide-react';
import { RiVerifiedBadgeLine } from 'react-icons/ri';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <PageContainer>
        {/* Hero Section */}
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
            <p className="text-primary text-[2.5rem] font-[600]">10K+</p>
            <p className="font-[300] tracking-wider">HAPPY PATIENTS</p>
          </div>
          <div className="border-r-border-strong flex flex-1 flex-col items-center justify-center border-r">
            <p className="text-primary text-[2.5rem] font-[600]">50+</p>
            <p className="font-[300] tracking-wider">SPECIALISTS</p>
          </div>
          <div className="border-r-border-strong flex flex-1 flex-col items-center justify-center border-r">
            <p className="text-primary text-[2.5rem] font-[600]">15+</p>
            <p className="font-[300] tracking-wider">YEARS EXPERIENCE</p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-primary text-[2.5rem] font-[600]">4.9</p>
            <p className="font-[300] tracking-wider">AVERAGE RATING</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <PageContainer>
        <div className="animate-in fade-in slide-in-from-bottom-8 grid grid-cols-1 gap-6 duration-700 md:grid-cols-3">
          <FeatureCard
            icon={<Calendar className="h-6 w-6" />}
            title={t('home.feature_1_title')}
            desc={t('home.feature_1_desc')}
          />
          <FeatureCard
            icon={<CreditCard className="h-6 w-6" />}
            title={t('home.feature_2_title')}
            desc={t('home.feature_2_desc')}
          />
          <FeatureCard
            icon={<Stethoscope className="h-6 w-6" />}
            title={t('home.feature_3_title')}
            desc={t('home.feature_3_desc')}
          />
        </div>
      </PageContainer>
    </>
  );
}
