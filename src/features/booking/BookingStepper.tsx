import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function BookingStepper({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  const { t } = useTranslation();

  const steps = [
    { id: 1, label: t('booking.step_slot', 'Select Slot') },
    { id: 2, label: t('booking.step_checkout', 'Visit & Payment') },
    { id: 3, label: t('booking.step_ticket', 'Digital Ticket') }
  ];

  return (
    <nav aria-label="Booking steps" className="mx-auto mb-8 max-w-2xl">
      <ol className="flex items-center justify-between gap-2">
        {steps.map((step, idx) => {
          const done = step.id < currentStep;
          const active = step.id === currentStep;
          return (
            <li key={step.id} className="flex flex-1 items-center gap-2">
              <div
                className={`flex items-center gap-2 text-xs font-bold sm:text-sm ${
                  active ? 'text-primary' : done ? 'text-success' : 'text-muted'
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs tabular-nums ${
                    done
                      ? 'border-success bg-success text-on-primary'
                      : active
                        ? 'border-primary bg-primary text-on-primary'
                        : 'border-border bg-surface text-muted'
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : step.id}
                </span>
                <span className="truncate">{step.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`h-px flex-1 ${done ? 'bg-success' : 'bg-border'}`} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
