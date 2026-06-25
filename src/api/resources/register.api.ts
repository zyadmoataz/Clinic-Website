import type { RegisterUser } from '@/types';
import { apiClient } from '../apiClient';

export const registerAPI = async (data: RegisterUser) => {
  const res = await apiClient.post('/auth/register', data);
  return res.data;
};
