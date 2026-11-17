import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { showToast } from '@/lib/toast';
import { useAuthStore } from '@/store/authStore';
import { useBookingDraftStore } from '@/store/bookingDraftStore';

export const useLogoutQuery = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      useAuthStore.getState().logout();
      useBookingDraftStore.getState().clearDraft();
      queryClient.clear();
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
