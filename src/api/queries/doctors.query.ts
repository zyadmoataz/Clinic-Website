// ==========================================
// OWNER: Omar
// PURPOSE: Doctor Discovery - React Query hooks
// ==========================================
import { useQuery } from '@tanstack/react-query';
import {
  getDoctorsAPI,
  getDoctorByIdAPI,
  getDoctorSlotsAPI,
  type DoctorSummary,
  type DoctorDetail,
  type DoctorFilters
} from '../resources/doctors.api';

export const useDoctorsQuery = (filters: DoctorFilters = {}) => {
  return useQuery<DoctorSummary[]>({
    queryKey: ['doctors', filters],
    queryFn: () => getDoctorsAPI(filters),
    staleTime: 1000 * 60 // 1 minute
  });
};

export const useDoctorQuery = (id: string | undefined) => {
  return useQuery<DoctorDetail>({
    queryKey: ['doctor', id],
    queryFn: () => getDoctorByIdAPI(id as string),
    enabled: !!id
  });
};

export const useDoctorSlotsQuery = (
  id: string | undefined,
  date: string | null,
  serviceId: number | null
) => {
  return useQuery<string[]>({
    queryKey: ['doctor-slots', id, date, serviceId],
    queryFn: () => getDoctorSlotsAPI(id as string, date as string, serviceId as number),
    enabled: !!id && !!date && serviceId != null
  });
};
