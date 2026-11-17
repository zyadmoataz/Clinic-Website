import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Button, Input, Modal } from '@/components/ui';
import { getUpdateProfileSchema, type UpdateProfileFormData } from '@/schemas/profile.schema';
import type { User } from '@/types';

interface EditProfileModalProps {
  isOpen: boolean;
  user: User;
  isPending: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateProfileFormData) => void;
}

export function EditProfileModal({
  isOpen,
  user,
  isPending,
  onClose,
  onSubmit
}: EditProfileModalProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UpdateProfileFormData>({
    mode: 'onChange',
    resolver: zodResolver(getUpdateProfileSchema(t))
  });

  useEffect(() => {
    if (isOpen)
      reset({ displayName: user.name, phone: user.phone, avatarUrl: user.avatarUrl || '' });
  }, [isOpen, user, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('profile.edit')}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label htmlFor="prof-avatar" className="text-text mb-1 block text-sm font-semibold">
            {t('profile.profile-image')}
          </label>
          <Input id="prof-avatar" type="url" placeholder="https://..." {...register('avatarUrl')} />
          {errors.avatarUrl && (
            <p className="text-danger mt-1 text-xs">{String(errors.avatarUrl.message)}</p>
          )}
        </div>
        <div>
          <label htmlFor="prof-name" className="text-text mb-1 block text-sm font-semibold">
            {t('profile.name')}
          </label>
          <Input id="prof-name" type="text" {...register('displayName')} />
          {errors.displayName && (
            <p className="text-danger mt-1 text-xs">{String(errors.displayName.message)}</p>
          )}
        </div>
        <div>
          <label htmlFor="prof-phone" className="text-text mb-1 block text-sm font-semibold">
            {t('profile.phone')}
          </label>
          <Input id="prof-phone" type="tel" {...register('phone')} />
          {errors.phone && (
            <p className="text-danger mt-1 text-xs">{String(errors.phone.message)}</p>
          )}
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isPending}>
            {t('profile.cancel')}
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? `${t('profile.saving')}...` : t('profile.save')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
