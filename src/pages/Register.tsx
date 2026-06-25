// ==========================================
// OWNER: Zyad
// ==========================================

import { Button, Input } from '../components/ui';
import { useForm } from 'react-hook-form';
import { getRegisterSchema } from '../schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useRegisterQuery } from '@/api/queries/register.query';
import type { RegisterUser } from '../types';
import { PageContainer } from '../components/layout/PageContainer';

export default function Page() {
  const { t } = useTranslation();
  const registerSchema = getRegisterSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      displayName: '',
      email: '',
      phone: '',
      password: ''
    },
    resolver: zodResolver(registerSchema)
  });

  const { mutate: registerUser, isPending, error: registerError } = useRegisterQuery();

  const onSubmit = (data: RegisterUser) => {
    registerUser(data);
    console.log(data);
  };

  return (
    <PageContainer className="mx-auto max-w-xl py-24">
      <div className="flex flex-col gap-1 pb-16">
        <h1 className="text-[32px] font-extrabold">{t('register.hero_title')}</h1>
        <p className="text-faint">{t('register.hero_subtitle')}</p>
      </div>
      {registerError && <p className="text-danger">{t('register.correct_email_or_password')}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label className="font-600">{t('register.full_name')}</label>
          <Input placeholder="e.g. Sara Al-Amri" type="text" {...register('displayName')} />
          {errors.displayName && (
            <p className="text-danger">{String(errors.displayName.message)}</p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-600">{t('register.phone')}</label>
          <Input placeholder="+201012345678" type="tel" {...register('phone')} />
          {errors.phone && <p className="text-danger">{String(errors.phone.message)}</p>}
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-600">{t('register.email')}</label>
          <Input placeholder="you@email.com" type="email" {...register('email')} />
          {errors.email && <p className="text-danger">{String(errors.email.message)} </p>}
          {/* {errors.email?.type === 'email' && (
            <p className="text-danger">{t('register.email_already_registered')}</p>
          )} */}
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-600">{t('register.password')}</label>
          <Input placeholder="••••••••" type="password" {...register('password')} />
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <Button className="w-full py-4" disabled={isPending}>
            <p> {isPending ? t('register.cta') + '...' : t('register.cta')} </p>
          </Button>
          <p className="text-faint mx-auto">{t('register.terms_privacy')}</p>
        </div>
      </form>
    </PageContainer>
  );
}
