import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAppointments, cancelAppointment } from '../resources/appointment.api';
import type { Appointment, FilterWhen, FilterStatus } from '../resources/appointment.api';
import { showToast } from '@/lib/toast';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import type { ApiErrorData } from '@/types';

export const useAppointments = (whenFilter: FilterWhen, statusFilter: FilterStatus) => {
  return useQuery<Appointment[]>({
    queryKey: ['myAppointments', whenFilter, statusFilter],
    queryFn: () => getAppointments(whenFilter, statusFilter)
  });
};

export const useCancelAppointment = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (id: number) => cancelAppointment(id),
    onSuccess: () => {
      showToast.success(t('appointments.cancel_success'));
      queryClient.invalidateQueries({ queryKey: ['myAppointments'] });
      onSuccessCallback();
    },
    onError: (error: AxiosError<ApiErrorData>) => {
      const serverMessage = error?.response?.data?.message || t('appointments.cancel_error');
      showToast.error(serverMessage);
    }
  });
};
