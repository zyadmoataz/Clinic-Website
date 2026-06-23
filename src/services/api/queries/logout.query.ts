import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export const useLogoutQuery = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem('auth_token');
      navigate('/');
    },
    onSuccess: () => {
      toast.success(t('login.logout'));
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};
