import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';

export const useLogoutQuery = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      useAuthStore.getState().logout();
      navigate('/');
    },
    onSuccess: () => {
      showToast.success(t('login.logout'));
    },
    onError: () => {
      showToast.error(t('common.error_occurred'));
    }
  });
};
