import { apiClient } from '../apiClient';
import type { User, UpdateProfilePayload } from '@/types';

export const updateProfileAPI = async (data: UpdateProfilePayload): Promise<User> => {
  const response = await apiClient.put<User>('/auth/profile', data);
  return response.data;
};
