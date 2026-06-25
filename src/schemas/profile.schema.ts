import type { TFunction } from 'i18next';
import { z } from 'zod';

export const getUpdateProfileSchema = (t: TFunction) =>
  z.object({
    displayName: z.string().min(1, t('profile.name_required')),
    phone: z.string().min(1, t('profile.phone_required')),
    avatarUrl: z.string().optional()
  });

export type UpdateProfileFormData = z.infer<ReturnType<typeof getUpdateProfileSchema>>;
