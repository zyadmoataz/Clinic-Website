import type {
  BookAppointmentResponse,
  CreateAppointmentPayload,
  MockPaymentPayload,
  MockPaymentResponse
} from '@/types';
import { apiClient } from '../apiClient';

export const bookAppointmentAPI = async (
  bookingPayload: CreateAppointmentPayload
): Promise<BookAppointmentResponse> => {
  const bookingResponse = await apiClient.post('/appointments', bookingPayload);
  return bookingResponse.data;
};

export const mockPaymentAPI = async (
  paymentPayload: MockPaymentPayload
): Promise<MockPaymentResponse> => {
  const paymentResponse = await apiClient.post('/payments/mock/pay', paymentPayload);
  return paymentResponse.data;
};
