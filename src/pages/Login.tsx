// ==========================================
// OWNER: Zyad
// ==========================================

import { Button, Input } from '../components/ui';
import { useTranslation } from 'react-i18next';
import { getLoginSchema } from '../schemas/auth.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { LoginUser } from '../types';
import { useLoginQuery } from '../services/api/queries/login.query';
import { PageContainer } from '../components/layout/PageContainer';

export default function Page() {
  const { t } = useTranslation();
  const loginSchema = getLoginSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  });

  const { mutate: loginUser, isPending, error: loginError } = useLoginQuery();

  const onSubmit = (data: LoginUser) => {
    loginUser(data);
  };

  return (
    <PageContainer className="mx-auto max-w-xl pt-24">
      <div className="flex flex-col gap-1 pb-16">
        <h1 className="text-[32px] font-extrabold">{t('login.hero_title')}</h1>
        <p className="text-faint">{t('login.hero_subtitle')}</p>
      </div>
      {errors.password && loginError && (
        <p className="text-danger">{t('login.correct_email_or_password')}</p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label className="font-600">{t('login.email')}</label>
          <Input placeholder="you@email.com" type="email" {...register('email')} />
          {errors.email && <p className="text-danger">{String(errors.email.message)}</p>}
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className="font-600"> {t('login.password')} </label>
            <button className="text-primary hover:text-primary-hover cursor-pointer">
              {t('login.forgot')}
            </button>
          </div>
          <Input placeholder="••••••••" type="password" {...register('password')} />
        </div>
        {errors.password && <p className="text-danger">{String(errors.password.message)}</p>}
        <div className="mt-5">
          <Button className="w-full py-4" disabled={isPending}>
            <p>{isPending ? t('login.cta') + '...' : t('login.cta')}</p>
          </Button>{' '}
        </div>
      </form>
    </PageContainer>
  );
}
