import type { RegisterUser } from '@/types';
import { apiClient } from '../apiClient';

export const registerAPI = async (registerPayload: RegisterUser) => {
  const authResponse = await apiClient.post('/auth/register', registerPayload);
  return authResponse.data;
};
