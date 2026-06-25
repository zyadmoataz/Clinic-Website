import { useMutation } from '@tanstack/react-query';
import { loginAPI } from '../resources/login.api';
import type { LoginUser } from '@/types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { useAuthStore } from '@/store/authStore';

export const useLoginQuery = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LoginUser) => loginAPI(data),
    onSuccess: (data) => {
      showToast.success(t('login.success_login'));
      useAuthStore.getState().login(data.user, data.token);
      navigate('/');
    }
  });
};
