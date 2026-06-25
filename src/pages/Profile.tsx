// ==========================================
// OWNER: Othman
// ==========================================

import { PageContainer } from '../components/layout/PageContainer';
import { Button, Input, Spinner } from '../components/ui';
import { Modal } from '../components/ui/Modal';
import { useAuthMeQuery } from '../services/api/queries/authMe.query';
import { useUpdateProfileMutation } from '../services/api/mutations/updateProfile.mutation';
import { showToast } from '../lib/toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getUpdateProfileSchema, type UpdateProfileFormData } from '../schemas/profile.schema';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Page() {
  const { t } = useTranslation();
  const updateProfileSchema = getUpdateProfileSchema(t);

  const { data: user, isLoading, isError } = useAuthMeQuery(true);
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

  if (isLoading) return <Spinner />;
  if (isError) return <p>error</p>;
  if (!user) return null;

  const handleOpenModal = () => {
    reset({ displayName: user.name, phone: user.phone, avatarUrl: user.avatarUrl });
    setIsModalOpen(true);
  };

  const onSubmit = (data: UpdateProfileFormData) => {
    updateProfile(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        showToast.success('Your changes have been saved.');
      },
      onError: () => {
        showToast.error('Something went wrong. Please try again.');
      }
    });
  };

  return (
    <>
      <PageContainer>
        {/* Header: avatar + edit button */}
        <section className="mt-20 flex items-center justify-between">
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt={`${user.name}'s profile photo`}
              className="h-24 w-24 rounded-full border-4 border-blue-100 object-cover"
            />
            <span className="absolute right-1 bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-400" />
          </div>
          <Button variant="ghost" onClick={handleOpenModal}>
            {t('profile.edit')}
          </Button>
        </section>

        {/* Info fields */}
        <section className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <span className="text-sm text-gray-500">{t('profile.name')}</span>
            <span className="text-sm font-medium text-gray-900">{user.name}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <span className="text-sm text-gray-500">{t('profile.email')}</span>
            <span className="text-sm font-medium text-gray-900">{user.email}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-sm text-gray-500">{t('profile.phone')}</span>
            <span className="text-sm font-medium text-gray-900">{user.phone}</span>
          </div>
        </section>
      </PageContainer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit profile">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <label className="font-600">{t('profile.profile-image')}</label>
            <Input type="text" {...register('avatarUrl')} />
            {errors.avatarUrl && <p className="text-danger">{String(errors.avatarUrl.message)}</p>}
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-600">Full {t('profile.name')}</label>
            <Input type="text" {...register('displayName')} />
            {errors.displayName && (
              <p className="text-danger">{String(errors.displayName.message)}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-600">{t('profile.phone')}</label>
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
