// ==========================================
// OWNER: Othman
// ==========================================

import { PageContainer } from '@/components/layout/PageContainer';
import { Button, Input } from '@/components/ui';
import { Modal } from '@/components/ui/Modal';
import { useAuthMeQuery } from '@/api/queries/authMe.query';
import { useUpdateProfileMutation } from '@/api/queries/updateProfile.mutation';
import { showToast } from '@/lib/toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getUpdateProfileSchema, type UpdateProfileFormData } from '@/schemas/profile.schema';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Page() {
  const { t } = useTranslation();
  const updateProfileSchema = getUpdateProfileSchema(t);

  const { data: user, isError } = useAuthMeQuery();
  const { mutate: updateProfile, isPending } = useUpdateProfileMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UpdateProfileFormData>({
    mode: 'onChange',
    resolver: zodResolver(updateProfileSchema)
  });

  if (isError) return <p>{t('common.error')}</p>;
  if (!user) return null;

  const handleOpenModal = () => {
    reset({ displayName: user.name, phone: user.phone, avatarUrl: user.avatarUrl });
    setIsModalOpen(true);
  };

  const onSubmit = (data: UpdateProfileFormData) => {
    updateProfile(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        showToast.success(t('profile.update_success'));
      },
      onError: () => {
        showToast.error(t('profile.update_error'));
      }
    });
  };

  return (
    <>
      <PageContainer>
        <div className="mx-auto max-w-xl pt-10 pb-30">
          {/* Header: avatar + edit button */}
          <section className="mt-20 flex items-center justify-between">
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt={`${user.name}'s profile photo`}
                className="border-primary-soft h-24 w-24 rounded-full border-4 object-cover"
              />
              <span className="border-surface bg-success absolute right-1 bottom-1 h-4 w-4 rounded-full border-2" />
            </div>
            <Button variant="ghost" onClick={handleOpenModal}>
              {t('profile.edit')}
            </Button>
          </section>

          {/* Info fields */}
          <section className="bg-surface border-border mt-8 rounded-2xl border shadow-sm">
            <div className="border-border flex items-center justify-between border-b px-6 py-4">
              <span className="text-muted text-sm">{t('profile.name')}</span>
              <span className="text-text text-sm font-medium">{user.name}</span>
            </div>
            <div className="border-border flex items-center justify-between border-b px-6 py-4">
              <span className="text-muted text-sm">{t('profile.email')}</span>
              <span className="text-text text-sm font-medium">{user.email}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-muted text-sm">{t('profile.phone')}</span>
              <span className="text-text text-sm font-medium">{user.phone}</span>
            </div>
          </section>
        </div>
      </PageContainer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit profile">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <label className="text-text font-semibold">{t('profile.profile-image')}</label>
            <Input type="text" {...register('avatarUrl')} />
            {errors.avatarUrl && <p className="text-danger">{String(errors.avatarUrl.message)}</p>}
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-text font-semibold">{t('profile.name')}</label>
            <Input type="text" {...register('displayName')} />
            {errors.displayName && (
              <p className="text-danger">{String(errors.displayName.message)}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-text font-semibold">{t('profile.phone')}</label>
            <Input type="tel" {...register('phone')} />
            {errors.phone && <p className="text-danger">{String(errors.phone.message)}</p>}
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
              disabled={isPending}
            >
              {t('profile.cancel')}
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? t('profile.saving') + '...' : t('profile.save')}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
