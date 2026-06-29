import { PageContainer } from '@/components/layout/PageContainer';
import { Button, Input } from '@/components/ui';
import { User } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { useAuthMeQuery } from '@/api/queries/authMe.query';
import { useUpdateProfileMutation } from '@/api/queries/updateProfile.mutation';
import { showToast } from '@/lib/toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  getUpdateProfileSchema,
  getChangePasswordSchema,
  type UpdateProfileFormData,
  type ChangePasswordFormData
} from '@/schemas/profile.schema';
import { useChangePasswordMutation } from '@/api/queries/changePassword.query';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Page() {
  const { t } = useTranslation();
  const updateProfileSchema = getUpdateProfileSchema(t);
  const changePasswordSchema = getChangePasswordSchema(t);

  const { data: user, isError } = useAuthMeQuery();
  const { mutate: updateProfile, isPending } = useUpdateProfileMutation();
  const { mutate: changePassword, isPending: isChangePasswordPending } =
    useChangePasswordMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UpdateProfileFormData>({
    mode: 'onChange',
    resolver: zodResolver(updateProfileSchema)
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors }
  } = useForm<ChangePasswordFormData>({
    mode: 'onChange',
    resolver: zodResolver(changePasswordSchema)
  });

  if (isError) return <p>{t('common.error')}</p>;
  if (!user) return null;

  const handleOpenModal = () => {
    reset({ displayName: user.name, phone: user.phone, avatarUrl: user.avatarUrl });
    setIsModalOpen(true);
  };

  const handleOpenPasswordModal = () => {
    resetPassword({ current: '', new: '' });
    setIsPasswordModalOpen(true);
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

  const onPasswordSubmit = (data: ChangePasswordFormData) => {
    changePassword(data, {
      onSuccess: () => {
        setIsPasswordModalOpen(false);
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
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={`${user.name}'s profile photo`}
                  className="border-primary-soft bg-surface-2 h-24 w-24 rounded-full border-4 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/default-avatar.png';
                    e.currentTarget.alt = '';
                  }}
                />
              ) : (
                <div className="border-primary-soft bg-surface-2 flex h-24 w-24 items-center justify-center rounded-full border-4">
                  <User size={40} className="text-primary" />
                </div>
              )}
              <span className="border-surface bg-success absolute right-1 bottom-1 h-4 w-4 rounded-full border-2 rtl:right-auto rtl:left-1" />
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

          {/* Security */}
          <section className="bg-surface border-border mt-6 rounded-2xl border p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-text text-lg font-semibold">
                  {t('profile.security', 'Security')}
                </h3>
                <p className="text-muted mt-1 text-sm">
                  {t('profile.security_desc', 'Manage your password and security settings.')}
                </p>
              </div>
              <Button variant="secondary" onClick={handleOpenPasswordModal}>
                {t('profile.change_password', 'Change Password')}
              </Button>
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

      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title={t('profile.change_password', 'Change Password')}
      >
        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <label className="text-text text-sm font-semibold">
              {t('profile.current_password', 'Current Password')}
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              className="w-full"
              {...registerPassword('current')}
            />
            {passwordErrors.current && (
              <p className="text-danger mt-1 text-sm">{String(passwordErrors.current.message)}</p>
            )}
          </div>

          <div className="mt-2 flex flex-col gap-4">
            <label className="text-text text-sm font-semibold">
              {t('profile.new_password', 'New Password')}
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              className="w-full"
              {...registerPassword('new')}
            />
            {passwordErrors.new && (
              <p className="text-danger mt-1 text-sm">{String(passwordErrors.new.message)}</p>
            )}
          </div>

          <div className="mt-2 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsPasswordModalOpen(false)}
              disabled={isChangePasswordPending}
            >
              {t('profile.cancel')}
            </Button>
            <Button type="submit" disabled={isChangePasswordPending}>
              {isChangePasswordPending
                ? t('profile.saving', 'Saving...')
                : t('profile.save', 'Save')}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
