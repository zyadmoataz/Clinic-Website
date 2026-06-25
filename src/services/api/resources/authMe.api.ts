import { apiClient } from '../apiClient';
import type { User } from '../../../types';

export const getAuthMeAPI = async (): Promise<User> => {
  const response = await apiClient.get<User>('/auth/me');
  return response.data;
};
