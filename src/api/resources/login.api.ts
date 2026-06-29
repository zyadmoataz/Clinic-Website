import type { LoginUser } from '@/types';
import { apiClient } from '../apiClient';

export const loginAPI = async (loginPayload: LoginUser) => {
  const authResponse = await apiClient.post('/auth/login', loginPayload);
  return authResponse.data;
};
