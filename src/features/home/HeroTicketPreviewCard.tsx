import { useTranslation } from 'react-i18next';
import { Clock3, QrCode, Ticket } from 'lucide-react';

export function HeroTicketPreviewCard() {
  const { t } = useTranslation();

  return (
    <div
      className="animate-fade-up relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-md"
      style={{ animationDelay: '120ms' }}
    >
      <div className="border-border bg-surface relative overflow-hidden rounded-3xl border shadow-lg transition-transform duration-500 hover:scale-[1.01]">
        <img
          src="/images/hero-img.jpg"
          width={408}
          height={728}
          fetchPriority="high"
          alt="Medora Clinics reception check-in desk"
          className="aspect-[4/5] w-full object-cover object-top"
        />
        <div className="bg-surface/90 border-border absolute start-4 top-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold shadow-md backdrop-blur-md">
          <Clock3 className="text-primary h-3.5 w-3.5" />
          <span className="text-text tabular-nums">{t('home.hero.wait_badge', '~6 min wait')}</span>
          <span className="bg-border h-3 w-px" />
          <span className="text-success">{t('home.hero.open_badge', '6 Open')}</span>
        </div>

        <div className="bg-surface/95 border-border animate-float-gentle absolute inset-x-4 bottom-4 rounded-2xl border p-4 shadow-lg backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="bg-accent-soft text-accent flex h-10 w-10 items-center justify-center rounded-xl">
                <Ticket className="h-5 w-5" />
              </span>
              <div>
                <p className="text-muted text-[11px] font-semibold tracking-wider uppercase">
                  {t('home.hero.ticket_preview_label')}
                </p>
                <p dir="ltr" className="text-text font-display text-sm font-extrabold tabular-nums">
                  MDR-2026-0101 · #A-01
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg p-0.5">
              <QrCode className="text-primary h-7 w-7 shrink-0" />
              <span
                aria-hidden="true"
                className="bg-accent animate-scan-sweep pointer-events-none absolute inset-x-0 top-0 h-0.5 rounded-full"
              />
            </div>
          </div>
          <div className="border-border mt-3 flex items-center justify-between border-t pt-2.5 text-xs">
            <span className="text-muted">
              {t('home.hero.ticket_preview_doctor', 'Dr. Sarah Mansour · Suite 201')}
            </span>
            <span className="bg-success-soft text-success rounded-full px-2.5 py-0.5 font-bold">
              {t('appointments.statuses.arrived', 'Checked In')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
