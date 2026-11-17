import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Bone, Brain, ClipboardPlus, HeartPulse, Smile, Stethoscope } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { FeatureCard } from '@/components/cards/FeatureCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function SpecialtiesGridSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);

  const specialties = [
    {
      icon: HeartPulse,
      title: t('home.services.service2-title'),
      desc: t('home.services.service2-desc'),
      filter: 'Cardiology'
    },
    {
      icon: Stethoscope,
      title: t('home.services.service1-title'),
      desc: t('home.services.service1-desc'),
      filter: 'Dermatology'
    },
    {
      icon: ClipboardPlus,
      title: t('home.services.service3-title'),
      desc: t('home.services.service3-desc'),
      filter: 'Pediatrics'
    },
    {
      icon: Brain,
      title: t('home.services.service4-title'),
      desc: t('home.services.service4-desc'),
      filter: 'Neurology'
    },
    {
      icon: Smile,
      title: t('home.services.service5-title'),
      desc: t('home.services.service5-desc'),
      filter: 'Dentistry'
    },
    {
      icon: Bone,
      title: t('home.services.service6-title'),
      desc: t('home.services.service6-desc'),
      filter: 'Orthopedics'
    }
  ];

  return (
    <section className="bg-surface-2 py-14 md:py-18">
      <PageContainer>
        <div ref={ref} className={`reveal mb-10 text-center ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-text mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
            {t('home.services.services-title')}
          </h2>
          <p className="text-muted text-sm sm:text-base">{t('home.services.services-subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {specialties.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={item.filter}
                type="button"
                onClick={() =>
                  navigate(`/doctors?specialization=${encodeURIComponent(item.filter)}`)
                }
                style={{ transitionDelay: `${idx * 60}ms` }}
                className={`reveal block h-full w-full cursor-pointer text-start ${isVisible ? 'is-visible' : ''}`}
              >
                <FeatureCard
                  icon={<Icon className="h-6 w-6" />}
                  title={item.title}
                  desc={item.desc}
                  actionLabel={t('doctors.book_now')}
                />
              </button>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
