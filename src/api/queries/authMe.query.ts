import { useQuery } from '@tanstack/react-query';
import { getAuthMeAPI } from '../resources/authMe.api';
import type { User } from '@/types';

export const useAuthMeQuery = () => {
  return useQuery<User>({
    queryKey: ['authMe'],
    queryFn: getAuthMeAPI
  });
};
