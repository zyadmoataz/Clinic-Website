// ==========================================
// OWNER: Othman
// ==========================================
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui';
import { FeatureCard } from '../components/cards/FeatureCard';
import { PageContainer } from '../components/layout/PageContainer';
import { Calendar, CreditCard, Stethoscope } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();

  return (
    <PageContainer className="py-20">
      {/* Hero Section */}
      <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto mb-20 max-w-3xl text-center duration-500">
        <h1 className="text-text mb-6 text-4xl leading-tight font-black tracking-tight md:text-5xl lg:text-6xl">
          {t('home.hero_title')}
        </h1>
        <p className="text-muted mb-10 text-lg md:text-xl">{t('home.hero_subtitle')}</p>
        <Button className="h-12 rounded-full px-8 text-lg">{t('home.cta')} →</Button>
      </div>

      {/* Features Grid */}
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
  );
}
