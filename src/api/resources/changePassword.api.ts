import type { ChangePasswordPayload } from '@/types';
import { apiClient } from '../apiClient';

export const changePasswordAPI = async (payload: ChangePasswordPayload): Promise<void> => {
  await apiClient.put('/auth/password', payload);
};
