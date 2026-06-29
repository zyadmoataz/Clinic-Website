import { apiClient } from '../apiClient';
import type { User } from '@/types';

export const getAuthMeAPI = async (): Promise<User> => {
  const authResponse = await apiClient.get<User>('/auth/me');
  return authResponse.data;
};
