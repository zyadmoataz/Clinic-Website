import { useMutation } from '@tanstack/react-query';
import { registerAPI } from '../resources/register.api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../store/authStore';

export const useRegisterQuery = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['register'],
    mutationFn: registerAPI,
    onSuccess: (data) => {
      toast.success(t('login.success_login'));
      setTimeout(() => {
        useAuthStore.getState().login(data.user, data.token);
        navigate('/');
      }, 2000);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};
