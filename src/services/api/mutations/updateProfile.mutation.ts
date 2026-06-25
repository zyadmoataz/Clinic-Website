// mutations/updateProfile.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfileAPI } from '../resources/updateProfile.api';

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authMe'] });
    }
  });
};
