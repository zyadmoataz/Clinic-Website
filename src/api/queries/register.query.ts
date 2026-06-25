import { useMutation } from '@tanstack/react-query';
import { registerAPI } from '../resources/register.api';
import { showToast } from '@/lib/toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { AxiosError } from 'axios';
import type { ApiErrorData } from '@/types';

export const useRegisterQuery = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['register'],
    mutationFn: registerAPI,
    onSuccess: (data) => {
      showToast.success(t('register.success_register'));
      setTimeout(() => {
        useAuthStore.getState().login(data.user, data.token);
        navigate('/');
      }, 2000);
    },
    onError: (error: AxiosError<ApiErrorData>) => {
      const serverMessage =
        error?.response?.data?.message || t('register.correct_email_or_password');
      showToast.error(serverMessage);
    }
  });
};
