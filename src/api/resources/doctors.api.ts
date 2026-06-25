// ==========================================
// OWNER: Omar
// PURPOSE: Doctor Discovery - REST resources
// Endpoints:
//   GET /doctors                       -> { items: DoctorSummary[] }
//   GET /doctors/{id}                  -> DoctorDetail
//   GET /doctors/{id}/slots?date&serviceId -> { date, slots: string[] }
// ==========================================
import { apiClient } from '../apiClient';

export interface DoctorService {
  id: number;
  name: string;
  durationMinutes: number;
  price: number;
  doctorId: string;
  doctorName: string;
}

export interface DoctorSummary {
  id: string;
  displayName: string;
  specialization: string;
  photoUrl: string | null;
  bio: string | null;
  services: DoctorService[];
  rating: number;
  reviewCount: number;
  yearsExperience: number;
}

export interface DoctorDetail extends DoctorSummary {
  nearestAvailableDates: string[];
}

export interface DoctorsListResponse {
  items: DoctorSummary[];
}

export interface DoctorSlotsResponse {
  date: string;
  slots: string[];
}

export interface DoctorFilters {
  search?: string;
  specialization?: string;
}

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
