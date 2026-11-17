import { Clock3, FileCheck2, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/layout/PageContainer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function WhyChooseUsSection() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.12);

  const pillars = [
    {
      icon: Clock3,
      tag: t('home.whyUs.tag1', 'Live Queue'),
      title: t('home.whyUs.whyUs-card1-title'),
      text: t('home.whyUs.whyUs-card1-text')
    },
    {
      icon: ShieldCheck,
      tag: t('home.whyUs.tag2', 'Verified Care'),
      title: t('home.whyUs.whyUs-card2-title'),
      text: t('home.whyUs.whyUs-card2-text')
    },
    {
      icon: FileCheck2,
      tag: t('home.whyUs.tag3', 'Digital E-Rx'),
      title: t('home.whyUs.whyUs-card3-title'),
      text: t('home.whyUs.whyUs-card3-text')
    },
    {
      icon: LockKeyhole,
      tag: t('home.whyUs.tag4', 'Privacy First'),
      title: t('home.whyUs.whyUs-card4-title'),
      text: t('home.whyUs.whyUs-card4-text')
    }
  ];

  return (
    <PageContainer className="py-14 md:py-18">
      <div ref={ref} className={`reveal mb-10 text-center ${isVisible ? 'is-visible' : ''}`}>
        <p className="text-accent mb-2 text-xs font-bold tracking-wider uppercase">
          {t('home.whyUs.eyebrow', 'Clinical Platform Standards')}
        </p>
        <h2 className="text-text mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {t('home.whyUs.whyUs-title')}
        </h2>
        <p className="text-muted mx-auto max-w-2xl text-sm sm:text-base">
          {t('home.whyUs.whyUs-subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <article
              key={item.tag}
              style={{ transitionDelay: `${idx * 70}ms` }}
              className={`spotlight-card group bg-surface border-border reveal flex h-full flex-col rounded-2xl border p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md ${
                isVisible ? 'is-visible' : ''
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="bg-primary-soft text-primary group-hover:bg-primary group-hover:text-on-primary flex h-11 w-11 items-center justify-center rounded-xl transition-colors">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="bg-surface-2 text-muted rounded-full px-2.5 py-0.5 text-[11px] font-bold">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-text mb-2 text-base font-bold">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.text}</p>
            </article>
          );
        })}
      </div>
    </PageContainer>
  );
}
