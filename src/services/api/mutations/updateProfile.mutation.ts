import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../apiClient';
import type { User } from '../../../types';

const updateProfileAPI = async (data: Partial<User>): Promise<User> => {
  const response = await apiClient.patch<User>('/auth/me', data);
  return response.data;
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authMe'] });
    }
  });
};
