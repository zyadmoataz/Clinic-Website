import type { ReactNode } from 'react';
import { CalendarCheck2, QrCode, ShieldCheck } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';

interface AuthCardShellProps {
  title: string;
  subtitle: string;
  heldSlotBanner?: string | null;
  errorBanner?: string | null;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCardShell({
  title,
  subtitle,
  heldSlotBanner,
  errorBanner,
  children,
  footer
}: AuthCardShellProps) {
  return (
    <PageContainer className="py-10 md:py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <aside className="from-primary via-primary-hover relative hidden overflow-hidden rounded-3xl bg-gradient-to-br to-[#1e3a8a] p-8 text-white shadow-lg lg:col-span-5 lg:block">
          <div
            aria-hidden="true"
            className="hero-dot-grid pointer-events-none absolute inset-0 opacity-25"
          />
          <div className="relative z-10 space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
              <ShieldCheck className="h-3.5 w-3.5" /> Medora Patient Portal
            </span>
            <h2 className="text-3xl leading-tight font-extrabold">
              Your Clinic Visits, Tickets &amp; E-Rx in One Place.
            </h2>
            <p className="text-sm leading-relaxed text-white/80">
              Sign in once to confirm reserved time slots, track reception check-in live, and print
              digital prescriptions anytime.
            </p>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs font-bold">
                <span>Instant Check-In Ticket</span>
                <QrCode className="h-5 w-5" />
              </div>
              <p className="mt-1 font-mono text-xs text-white/75">
                MDR-2026-0101 · Synchronized with Reception
              </p>
            </div>
          </div>
        </aside>

        <div className="bg-surface border-border animate-fade-up rounded-3xl border p-6 shadow-md sm:p-8 lg:col-span-7">
          <div className="mb-6 space-y-1.5">
            <h1 className="text-text text-2xl font-extrabold sm:text-3xl">{title}</h1>
            <p className="text-muted text-sm">{subtitle}</p>
          </div>

          {heldSlotBanner && (
            <div className="bg-primary-soft border-primary/20 text-text mb-5 flex items-start gap-3 rounded-2xl border p-3.5 text-xs font-medium">
              <CalendarCheck2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
              <span>{heldSlotBanner}</span>
            </div>
          )}

          {errorBanner && (
            <div
              role="alert"
              className="bg-danger-soft border-danger/20 text-danger mb-5 rounded-xl border p-3.5 text-xs font-semibold"
            >
              {errorBanner}
            </div>
          )}

          {children}

          {footer && <div className="border-border mt-6 border-t pt-5">{footer}</div>}
        </div>
      </div>
    </PageContainer>
  );
}
