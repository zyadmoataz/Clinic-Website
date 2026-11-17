import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { User } from '@/types';
import { useAuthStore } from '@/store/authStore';
import { updateProfileAPI } from '../resources/updateProfile.api';

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileAPI,
    onSuccess: (updatedUser: User) => {
      useAuthStore.getState().updateUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ['authMe'] });
    }
  });
};
