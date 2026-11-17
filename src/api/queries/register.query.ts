import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import { registerAPI } from '../resources/register.api';
import { showToast } from '@/lib/toast';
import { useAuthStore } from '@/store/authStore';
import type { ApiErrorData } from '@/types';
import { getSafeRedirectPath } from '@/utils/safeRedirect';

export const useRegisterQuery = (redirectTo?: string) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['register'],
    mutationFn: registerAPI,
    onSuccess: (data) => {
      useAuthStore.getState().login(data.user, data.token);
      queryClient.invalidateQueries({ queryKey: ['authMe'] });
      const target = getSafeRedirectPath(redirectTo, '/');
      showToast.success(
        target.startsWith('/booking')
          ? t('register.return_to_booking', 'Account created! Completing your booking now.')
          : t('register.success_register')
      );
      navigate(target, { replace: true });
    },
    onError: (error: AxiosError<ApiErrorData>) => {
      const serverMessage =
        error?.response?.data?.message || t('register.correct_email_or_password');
      showToast.error(serverMessage);
    }
  });
};
