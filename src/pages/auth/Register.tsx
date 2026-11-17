import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@/components/ui';
import { getRegisterSchema } from '@/schemas/auth.schema';
import type { RegisterUser } from '@/types';
import { useRegisterQuery } from '@/api/queries/register.query';
import { getSafeRedirectPath } from '@/utils/safeRedirect';
import { AuthCardShell } from '@/features/auth/AuthCardShell';

export default function RegisterPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const fromState = (location.state as { from?: { pathname: string; search?: string } } | null)
    ?.from;
  const rawRedirect =
    searchParams.get('redirect') ||
    (fromState ? `${fromState.pathname}${fromState.search || ''}` : '/');
  const redirectTo = getSafeRedirectPath(rawRedirect, '/');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterUser>({
    mode: 'onChange',
    defaultValues: { displayName: '', email: '', phone: '', password: '' },
    resolver: zodResolver(getRegisterSchema(t))
  });

  const { mutate: registerUser, isPending, error: registerError } = useRegisterQuery(redirectTo);

  const loginHref =
    redirectTo !== '/' ? `/login?redirect=${encodeURIComponent(redirectTo)}` : '/login';

  return (
    <AuthCardShell
      title={t('register.hero_title')}
      subtitle={t('register.hero_subtitle')}
      heldSlotBanner={redirectTo.startsWith('/booking') ? t('register.booking_after') : null}
      errorBanner={registerError ? t('register.correct_email_or_password') : null}
      footer={
        <p className="text-muted text-center text-sm">
          {t('register.already_have')}{' '}
          <Link to={loginHref} className="text-primary font-semibold hover:underline">
            {t('navbar.sign_in')}
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit((data) => registerUser(data))} className="flex flex-col gap-4">
        <div>
          <label htmlFor="reg-name" className="text-text mb-1.5 block text-sm font-semibold">
            {t('register.full_name')}
          </label>
          <Input
            id="reg-name"
            placeholder={t('register.name_placeholder')}
            type="text"
            autoComplete="name"
            {...register('displayName')}
          />
          {errors.displayName && (
            <p className="text-danger mt-1 text-xs">{String(errors.displayName.message)}</p>
          )}
        </div>
        <div>
          <label htmlFor="reg-phone" className="text-text mb-1.5 block text-sm font-semibold">
            {t('register.phone')}
          </label>
          <Input
            id="reg-phone"
            placeholder={t('register.phone_placeholder')}
            type="tel"
            autoComplete="tel"
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-danger mt-1 text-xs">{String(errors.phone.message)}</p>
          )}
        </div>
        <div>
          <label htmlFor="reg-email" className="text-text mb-1.5 block text-sm font-semibold">
            {t('register.email')}
          </label>
          <Input
            id="reg-email"
            placeholder={t('register.email_placeholder')}
            type="email"
            autoComplete="email"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-danger mt-1 text-xs">{String(errors.email.message)}</p>
          )}
        </div>
        <div>
          <label htmlFor="reg-password" className="text-text mb-1.5 block text-sm font-semibold">
            {t('register.password')}
          </label>
          <Input
            id="reg-password"
            placeholder={t('register.password_placeholder')}
            type="password"
            autoComplete="new-password"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-danger mt-1 text-xs">{String(errors.password.message)}</p>
          )}
        </div>
        <Button type="submit" className="mt-2 w-full py-3.5" disabled={isPending}>
          {isPending ? `${t('register.cta')}...` : t('register.cta')}
        </Button>
        <p className="text-faint text-center text-xs">{t('register.terms_privacy')}</p>
      </form>
    </AuthCardShell>
  );
}
