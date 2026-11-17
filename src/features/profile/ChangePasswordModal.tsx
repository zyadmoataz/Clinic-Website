import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Button, Input, Modal } from '@/components/ui';
import { getChangePasswordSchema, type ChangePasswordFormData } from '@/schemas/profile.schema';

interface ChangePasswordModalProps {
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onSubmit: (data: ChangePasswordFormData) => void;
}

export function ChangePasswordModal({
  isOpen,
  isPending,
  onClose,
  onSubmit
}: ChangePasswordModalProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ChangePasswordFormData>({
    mode: 'onChange',
    resolver: zodResolver(getChangePasswordSchema(t))
  });

  useEffect(() => {
    if (isOpen) reset({ current: '', new: '' });
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('profile.change_password')}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label htmlFor="pass-current" className="text-text mb-1 block text-sm font-semibold">
            {t('profile.current_password')}
          </label>
          <Input
            id="pass-current"
            type="password"
            placeholder="••••••••"
            {...register('current')}
          />
          {errors.current && (
            <p className="text-danger mt-1 text-xs">{String(errors.current.message)}</p>
          )}
        </div>
        <div>
          <label htmlFor="pass-new" className="text-text mb-1 block text-sm font-semibold">
            {t('profile.new_password')}
          </label>
          <Input id="pass-new" type="password" placeholder="••••••••" {...register('new')} />
          {errors.new && <p className="text-danger mt-1 text-xs">{String(errors.new.message)}</p>}
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
