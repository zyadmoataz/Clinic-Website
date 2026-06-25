import type { LoginUser } from '@/types';
import { apiClient } from '../apiClient';

export const loginAPI = async (data: LoginUser) => {
  const res = await apiClient.post('/auth/login', data);
  return res.data;
};
