import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { bookAppointmentAPI, mockPaymentAPI } from '../resources/booking.api';
import type { CreateAppointmentPayload, MockPaymentPayload } from '@/types';
import { showToast } from '@/lib/toast';
import type { ApiErrorData } from '@/types';
import type { AxiosError } from 'axios';

export const useBookAppointmentMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (payload: CreateAppointmentPayload) => bookAppointmentAPI(payload),

    onSuccess: () => {
      showToast.success(t('booking.book_success'));
      queryClient.invalidateQueries({
        queryKey: ['myAppointments']
      });
    },

    onError: (error: AxiosError<ApiErrorData>) => {
      const serverMessage = error.response?.data?.message || t('booking.book_error');
      showToast.error(serverMessage);
    }
  });
};

export const useMockPaymentMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (payload: MockPaymentPayload) => mockPaymentAPI(payload),

    onSuccess: () => {
      showToast.success(t('booking.payment_success'));
      queryClient.invalidateQueries({
        queryKey: ['myAppointments']
      });
    },

    onError: (error: AxiosError<ApiErrorData>) => {
      const serverMessage = error.response?.data?.message || t('booking.payment_error');
      showToast.error(serverMessage);
    }
  });
};
