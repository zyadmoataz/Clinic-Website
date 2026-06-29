import { useMutation } from '@tanstack/react-query';
import { changePasswordAPI } from '../resources/changePassword.api';
import { useTranslation } from 'react-i18next';
import { showToast } from '@/lib/toast';
import { AxiosError } from 'axios';
import type { ApiErrorData, ChangePasswordPayload } from '@/types';

export const useChangePasswordMutation = () => {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (data: ChangePasswordPayload) => changePasswordAPI(data),
    onSuccess: () => {
      showToast.success(t('profile.password_changed'));
    },
    onError: (error: AxiosError<ApiErrorData>) => {
      const serverMessage = error.response?.data?.message || t('common.error');
      showToast.error(serverMessage);
    }
  });
};
