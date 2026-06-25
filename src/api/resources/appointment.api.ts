import { apiClient } from '../apiClient';

export interface Prescription {
  drug: string;
  dosage: string;
  duration: string;
}

export interface Visit {
  id: number;
  appointmentId: number;
  diagnosis: string;
  notes: string;
  createdAt: string;
  editableUntil: string;
  isEditable: boolean;
  prescription: Prescription[];
}

export interface Payment {
  id: number;
  amount: number;
  method: string;
  status: string;
  transactionRef: string;
  paidAt: string;
}

export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: string;
  doctorName: string;
  serviceId: number;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  mode: string;
  status: string;
  paymentMethod: string;
  meetingLink: string;
  price: number;
  createdByRole: string;
  createdAt: string;
  payment: Payment;
  visit: Visit | null;
}

export type FilterStatus = 'all' | 'confirmed' | 'arrived' | 'completed' | 'cancelled' | 'NoShow';
export type FilterWhen = 'upcoming' | 'past';

export const getAppointments = async (
  when: FilterWhen,
  status: FilterStatus
): Promise<Appointment[]> => {
  const params: Record<string, string> = { when };
  if (status !== 'all') params.status = status;
  const response = await apiClient.get('/me/appointments', { params });
  return response.data;
};

export const cancelAppointment = async (id: number): Promise<void> => {
  await apiClient.put(`/appointments/${id}/cancel`, {});
};
