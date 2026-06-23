import { useQuery } from '@tanstack/react-query';
import { getAuthMeAPI } from '../resources/authMe.api';

export const useAuthMeQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['authMe'],
    queryFn: getAuthMeAPI,
    enabled: enabled,
    retry: false // Don't retry if the token is invalid or expired
  });
};
