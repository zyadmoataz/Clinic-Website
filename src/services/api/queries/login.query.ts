import { useMutation } from '@tanstack/react-query';
import { loginAPI } from '../resources/loigin.api';
import type { LoginUser } from '../../../types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLoginQuery = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LoginUser) => loginAPI(data),
    onSuccess: (data) => {
      toast.success(t('login.success_login'));
      localStorage.setItem('auth_token', data.token);
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
};
