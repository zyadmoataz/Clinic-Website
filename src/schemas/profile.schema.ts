import type { TFunction } from 'i18next';
import { z } from 'zod';

export const getUpdateProfileSchema = (t: TFunction) =>
  z.object({
    displayName: z.string().min(1, t('profile.name_required')),
    phone: z.string().min(1, t('profile.phone_required')),
    avatarUrl: z.string().optional()
  });

export type UpdateProfileFormData = z.infer<ReturnType<typeof getUpdateProfileSchema>>;

export const getChangePasswordSchema = (t: TFunction) =>
  z
    .object({
      current: z
        .string()
        .min(1, t('profile.current_password_required', 'Current password is required')),
      new: z
        .string()
        .min(8, t('register.password_validation', 'Password must be at least 8 characters'))
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)/,
          t(
            'register.password_complexity_validation',
            'Password must contain at least one letter and one number'
          )
        )
    })
    .refine((data) => data.current !== data.new, {
      message: t('profile.same_password', 'New password must be different from current password'),
      path: ['new']
    });

export type ChangePasswordFormData = z.infer<ReturnType<typeof getChangePasswordSchema>>;
