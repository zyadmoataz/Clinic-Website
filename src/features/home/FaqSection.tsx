import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/layout/PageContainer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function FaqSection() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.12);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = [
    { q: t('home.faq.q1'), a: t('home.faq.a1') },
    { q: t('home.faq.q2'), a: t('home.faq.a2') },
    { q: t('home.faq.q3'), a: t('home.faq.a3') },
    { q: t('home.faq.q4'), a: t('home.faq.a4') }
  ];

  return (
    <section className="bg-surface-2 border-border border-y py-14 md:py-18">
      <PageContainer className="mx-auto max-w-4xl">
        <div ref={ref} className={`reveal mb-9 text-center ${isVisible ? 'is-visible' : ''}`}>
          <p className="text-primary mb-2 text-xs font-bold tracking-wider uppercase">
            {t('home.faq.eyebrow', 'Patient Questions')}
          </p>
          <h2 className="text-text mb-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
            {t('home.faq.title', 'Frequently Asked Questions')}
          </h2>
          <p className="text-muted text-sm sm:text-base">
            {t(
              'home.faq.subtitle',
              'Everything you need to know about tickets, walk-ins, and prescriptions.'
            )}
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => {
            const expanded = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-surface border-border overflow-hidden rounded-2xl border shadow-sm transition-colors"
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpenIndex(expanded ? null : idx)}
                  className="hover:bg-surface-2/60 flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-start transition-colors"
                >
                  <span className="text-text text-sm font-bold sm:text-base">{item.q}</span>
                  <ChevronDown
                    className={`text-muted h-5 w-5 shrink-0 transition-transform duration-200 ${
                      expanded ? 'text-primary rotate-180' : ''
                    }`}
                  />
                </button>
                {expanded && (
                  <div className="border-border text-muted animate-fade-up border-t px-5 py-4 text-sm leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
