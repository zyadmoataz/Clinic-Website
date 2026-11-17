import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { AxiosError } from 'axios';
import type { ApiErrorData, Appointment, RescheduleAppointmentPayload } from '@/types';
import { showToast } from '@/lib/toast';
import {
  cancelAppointment,
  getAppointments,
  rescheduleAppointment,
  type FilterStatus,
  type FilterWhen
} from '../resources/appointment.api';

export const useAppointments = (whenFilter: FilterWhen, statusFilter: FilterStatus) => {
  return useQuery<Appointment[]>({
    queryKey: ['myAppointments', whenFilter, statusFilter],
    queryFn: () => getAppointments(whenFilter, statusFilter),
    refetchInterval: 10000
  });
};

export const useCancelAppointment = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (id: number) => cancelAppointment(id),
    onSuccess: () => {
      showToast.success(t('appointments.cancel_success'));
      queryClient.invalidateQueries({ queryKey: ['myAppointments'] });
      queryClient.invalidateQueries({ queryKey: ['doctor-slots'] });
      onSuccessCallback?.();
    },
    onError: (error: AxiosError<ApiErrorData>) => {
      const serverMessage = error?.response?.data?.message || t('appointments.cancel_error');
      showToast.error(serverMessage);
    }
  });
};

export const useRescheduleAppointment = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: RescheduleAppointmentPayload }) =>
      rescheduleAppointment(id, payload),
    onSuccess: () => {
      showToast.success(t('appointments.reschedule_success', 'Ticket rescheduled successfully.'));
      queryClient.invalidateQueries({ queryKey: ['myAppointments'] });
      queryClient.invalidateQueries({ queryKey: ['doctor-slots'] });
      onSuccessCallback?.();
    },
    onError: (error: AxiosError<ApiErrorData>) => {
      const serverMessage =
        error?.response?.data?.message ||
        t('appointments.reschedule_error', 'Could not reschedule ticket.');
      showToast.error(serverMessage);
    }
  });
};
