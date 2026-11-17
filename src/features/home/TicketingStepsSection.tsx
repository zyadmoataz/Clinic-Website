import { useTranslation } from 'react-i18next';
import { CalendarCheck, FileText, Search } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function TicketingStepsSection() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.15);

  const steps = [
    {
      num: '01',
      icon: Search,
      title: t('home.steps.step1_title', 'Explore Doctors Openly'),
      desc: t(
        'home.steps.step1_desc',
        'Browse specialists, transparent consultation fees, and live time slots with no sign-in required.'
      )
    },
    {
      num: '02',
      icon: CalendarCheck,
      title: t('home.steps.step2_title', 'Get Your Digital Ticket'),
      desc: t(
        'home.steps.step2_desc',
        'Confirm your visit in seconds and receive a unique Ticket Code, Queue Token, and QR check-in pass.'
      )
    },
    {
      num: '03',
      icon: FileText,
      title: t('home.steps.step3_title', 'Live Queue & E-Prescriptions'),
      desc: t(
        'home.steps.step3_desc',
        'Track reception check-in live and access structured digital prescriptions right after your visit.'
      )
    }
  ];

  return (
    <PageContainer className="py-14 md:py-20">
      <div ref={ref} className={`reveal mb-10 text-center ${isVisible ? 'is-visible' : ''}`}>
        <p className="text-primary mb-2 text-xs font-bold tracking-wider uppercase">
          {t('home.steps.eyebrow', 'Seamless 3-Step Flow')}
        </p>
        <h2 className="text-text mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {t('home.steps.title', 'How Medora Ticketing Works')}
        </h2>
        <p className="text-muted mx-auto max-w-2xl text-sm sm:text-base">
          {t(
            'home.steps.subtitle',
            'Built for real clinics — synchronizing online patients, reception check-in, and physician rooms.'
          )}
        </p>
      </div>

      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
        <div
          aria-hidden="true"
          className="border-border-strong pointer-events-none absolute top-11 right-[16%] left-[16%] hidden border-t-2 border-dashed md:block"
        />
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className={`spotlight-card group bg-surface border-border reveal relative z-10 rounded-2xl border p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md ${
                isVisible ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: `${idx * 90}ms` }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="bg-primary-soft text-primary group-hover:bg-primary group-hover:text-on-primary flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="bg-surface-2 text-faint group-hover:text-primary font-display rounded-full px-2.5 py-1 text-xs font-extrabold tabular-nums transition-colors">
                  {step.num}
                </span>
              </div>
              <h3 className="text-text group-hover:text-primary mb-2 text-lg font-bold transition-colors">
                {step.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
