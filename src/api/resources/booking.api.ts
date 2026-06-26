import type {
  BookAppointmentResponse,
  CreateAppointmentPayload,
  MockPaymentPayload,
  MockPaymentResponse
} from '@/types';
import { apiClient } from '../apiClient';

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
