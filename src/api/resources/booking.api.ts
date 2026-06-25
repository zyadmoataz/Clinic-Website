import { apiClient } from '../apiClient';
import type { Appointment } from './appointment.api';

export interface PaymentCheckout {
  id: number;
  checkoutUrl: string;
}

export interface CreateAppointmentPayload {
  doctorId: string;
  serviceId: number;
  date: string;
  startTime: string;
  mode: string;
  paymentMethod: string;
}

export interface BookAppointmentResponse {
  appointment: Appointment;
  payment: PaymentCheckout;
}

export interface MockPaymentPayload {
  appointmentId: number;
  status: string;
}

export interface MockPaymentResponse {
  paid: boolean;
}

export const bookAppointmentAPI = async (
  payload: CreateAppointmentPayload
): Promise<BookAppointmentResponse> => {
  const response = await apiClient.post('/appointments', payload);
  return response.data;
};

export const mockPaymentAPI = async (payload: MockPaymentPayload): Promise<MockPaymentResponse> => {
  const response = await apiClient.post('/payments/mock/pay', payload);
  return response.data;
};
