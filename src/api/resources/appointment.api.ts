import type { Appointment, RescheduleAppointmentPayload } from '@/types';
import { apiClient } from '../apiClient';

export type FilterStatus = 'all' | 'confirmed' | 'arrived' | 'completed' | 'cancelled' | 'NoShow';
export type FilterWhen = 'upcoming' | 'past';

export const getAppointments = async (
  when: FilterWhen,
  status: FilterStatus
): Promise<Appointment[]> => {
  const params: Record<string, string> = { when };
  if (status !== 'all') params.status = status;
  const response = await apiClient.get<Appointment[]>('/me/appointments', { params });
  return response.data;
};

export const cancelAppointment = async (id: number): Promise<void> => {
  await apiClient.put(`/appointments/${id}/cancel`, {});
};

export const rescheduleAppointment = async (
  id: number,
  payload: RescheduleAppointmentPayload
): Promise<Appointment> => {
  const response = await apiClient.put<Appointment>(`/appointments/${id}/reschedule`, payload);
  return response.data;
};
