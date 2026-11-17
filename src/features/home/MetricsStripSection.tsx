import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCountUp } from '@/hooks/useCountUp';

interface StatDisplayProps {
  target: number;
  decimals?: number;
  suffix: string;
  label: string;
  active: boolean;
  delayMs: number;
}

function MetricCounter({ target, decimals = 0, suffix, label, active, delayMs }: StatDisplayProps) {
  const animated = useCountUp(target, active, 1100);
  const formatted =
    decimals > 0 ? animated.toFixed(decimals) : Math.round(animated).toLocaleString('en-US');

  return (
    <div
      className="flex flex-col items-center text-center"
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <p className="text-primary font-display text-3xl font-extrabold tabular-nums sm:text-4xl">
        {formatted}
        {suffix}
      </p>
      <p className="text-muted mt-1 text-xs font-semibold tracking-wider uppercase">{label}</p>
    </div>
  );
}

export function MetricsStripSection() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal<HTMLElement>(0.2);

  const metrics = [
    { target: 18500, suffix: '+', label: t('home.metrics.patients-text') },
    { target: 24, suffix: '+', label: t('home.metrics.specialists-text') },
    { target: 15, suffix: '+', label: t('home.metrics.experience-text') },
    { target: 4.9, decimals: 1, suffix: '★', label: t('home.metrics.rating-text') }
  ];

  return (
    <section
      ref={ref}
      className={`bg-surface-2 border-border reveal border-y py-8 ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="container mx-auto grid grid-cols-2 gap-6 px-4 lg:grid-cols-4">
        {metrics.map((m, idx) => (
          <MetricCounter
            key={m.label}
            target={m.target}
            decimals={m.decimals}
            suffix={m.suffix}
            label={m.label}
            active={isVisible}
            delayMs={idx * 70}
          />
        ))}
      </div>
    </section>
  );
}
