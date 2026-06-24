import { apiClient } from '../apiClient';
import type { User } from '../../../types';

interface UpdateProfilePayload {
  displayName: string;
  phone: string;
  avatarUrl?: string;
}

export const updateProfileAPI = async (data: UpdateProfilePayload): Promise<User> => {
  const response = await apiClient.put<User>('/auth/profile', data);
  return response.data;
};
