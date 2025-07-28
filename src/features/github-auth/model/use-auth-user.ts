import { useQuery } from '@tanstack/react-query';

import { getMe } from 'features/github-auth';

export function useAuthUser() {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe
  });
}
