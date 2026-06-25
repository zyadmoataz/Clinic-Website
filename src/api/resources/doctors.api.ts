// ==========================================
// OWNER: Omar
// ==========================================
import type {
  DoctorDetail,
  DoctorFilters,
  DoctorsListResponse,
  DoctorSlotsResponse,
  DoctorSummary
} from '@/types';
import { apiClient } from '../apiClient';

export const getDoctorsAPI = async (filters: DoctorFilters = {}): Promise<DoctorSummary[]> => {
  const params: Record<string, string> = {};
  if (filters.search) params.search = filters.search;
  if (filters.specialization) params.specialization = filters.specialization;

  const response = await apiClient.get<DoctorsListResponse>('/doctors', { params });
  return response.data.items ?? [];
};

export const getDoctorByIdAPI = async (id: string): Promise<DoctorDetail> => {
  const response = await apiClient.get<DoctorDetail>(`/doctors/${id}`);
  return response.data;
};

export const getDoctorSlotsAPI = async (
  id: string,
  date: string,
  serviceId: number
): Promise<string[]> => {
  const response = await apiClient.get<DoctorSlotsResponse>(`/doctors/${id}/slots`, {
    params: { date, serviceId }
  });
  return response.data.slots ?? [];
};
