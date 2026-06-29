import { apiClient } from '../apiClient';
import type { User, UpdateProfilePayload } from '@/types';

export const updateProfileAPI = async (profilePayload: UpdateProfilePayload): Promise<User> => {
  const updateResponse = await apiClient.put<User>('/auth/profile', profilePayload);
  return updateResponse.data;
};
