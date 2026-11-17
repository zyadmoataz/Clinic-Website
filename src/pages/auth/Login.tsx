import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { getLoginSchema } from '@/schemas/auth.schema';
import type { LoginUser } from '@/types';
import { useLoginQuery } from '@/api/queries/login.query';
import { getSafeRedirectPath } from '@/utils/safeRedirect';
import { useBookingDraftStore } from '@/store/bookingDraftStore';
import { AuthCardShell } from '@/features/auth/AuthCardShell';
import { ForgotPasswordModal } from '@/features/auth/ForgotPasswordModal';

export default function LoginPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const fromState = (location.state as { from?: { pathname: string; search?: string } } | null)
    ?.from;
  const rawRedirect =
    searchParams.get('redirect') ||
    (fromState ? `${fromState.pathname}${fromState.search || ''}` : '/');
  const redirectTo = getSafeRedirectPath(rawRedirect, '/');
  const pendingDraft = useBookingDraftStore((s) => s.draft);
  const [forgotOpen, setForgotOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<LoginUser>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(getLoginSchema(t))
  });

  const { mutate: loginUser, isPending, error: loginError } = useLoginQuery(redirectTo);

  const heldSlotText =
    redirectTo.startsWith('/booking') || pendingDraft
      ? pendingDraft?.doctorName
        ? `${t('login.booking_held_title')}: ${pendingDraft.doctorName} · ${pendingDraft.date} (${pendingDraft.timeSlot})`
        : t('login.booking_held_desc')
      : null;

  const registerHref =
    redirectTo !== '/' ? `/register?redirect=${encodeURIComponent(redirectTo)}` : '/register';

  return (
    <>
      <AuthCardShell
        title={t('login.hero_title')}
        subtitle={t('login.hero_subtitle')}
        heldSlotBanner={heldSlotText}
        errorBanner={loginError ? t('login.correct_email_or_password') : null}
        footer={
          <>
            <button
              type="button"
              disabled={isPending}
              onClick={() => {
                setValue('email', 'patient@medoraclinics.com', { shouldValidate: true });
                setValue('password', 'Password123', { shouldValidate: true });
                loginUser({ email: 'patient@medoraclinics.com', password: 'Password123' });
              }}
              className="bg-accent-soft text-accent border-accent/25 hover:bg-accent/15 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition-colors disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              {t('login.demo_patient_cta')}
            </button>
            <p className="text-muted mt-4 text-center text-sm">
              {t('login.no_account')}{' '}
              <Link to={registerHref} className="text-primary font-semibold hover:underline">
                {t('navbar.create_account')}
              </Link>
            </p>
          </>
        }
      >
        <form onSubmit={handleSubmit((data) => loginUser(data))} className="flex flex-col gap-4">
          <div>
            <label htmlFor="login-email" className="text-text mb-1.5 block text-sm font-semibold">
              {t('login.email')}
            </label>
            <Input
              id="login-email"
              placeholder={t('login.email_placeholder')}
              type="email"
              autoComplete="email"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-danger mt-1 text-xs">{String(errors.email.message)}</p>
            )}
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="login-password" className="text-text text-sm font-semibold">
                {t('login.password')}
              </label>
              <button
                type="button"
                onClick={() => setForgotOpen(true)}
                className="text-primary hover:text-primary-hover cursor-pointer text-xs font-semibold"
              >
                {t('login.forgot')}
              </button>
            </div>
            <Input
              id="login-password"
              placeholder={t('login.password_placeholder')}
              type="password"
              autoComplete="current-password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-danger mt-1 text-xs">{String(errors.password.message)}</p>
            )}
          </div>

          <Button type="submit" className="mt-2 w-full py-3.5" disabled={isPending}>
            {isPending ? `${t('login.cta')}...` : t('login.cta')}
          </Button>
        </form>
      </AuthCardShell>

      <ForgotPasswordModal isOpen={forgotOpen} onClose={() => setForgotOpen(false)} />
    </>
  );
}
