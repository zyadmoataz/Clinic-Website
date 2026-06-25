import type { MedicalVisit } from '@/types';
import { apiClient } from '../apiClient';

export const getPrescriptions = async (): Promise<MedicalVisit[]> => {
  const response = await apiClient.get<MedicalVisit[]>('/me/prescriptions');
  return response.data;
};
