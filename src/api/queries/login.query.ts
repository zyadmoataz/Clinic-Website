import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../resources/login.api';
import type { LoginUser } from '@/types';
import { showToast } from '@/lib/toast';
import { useAuthStore } from '@/store/authStore';
import { getSafeRedirectPath } from '@/utils/safeRedirect';

export const useLoginQuery = (redirectTo?: string) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginUser) => loginAPI(data),
    onSuccess: (data) => {
      useAuthStore.getState().login(data.user, data.token);
      queryClient.invalidateQueries({ queryKey: ['authMe'] });
      const target = getSafeRedirectPath(redirectTo, '/');
      if (target.startsWith('/booking')) {
        showToast.success(
          t('login.return_to_booking', 'Signed in! Returning you to complete your booking.')
        );
      } else {
        showToast.success(t('login.success_login'));
      }
      navigate(target, { replace: true });
    }
  });
};
