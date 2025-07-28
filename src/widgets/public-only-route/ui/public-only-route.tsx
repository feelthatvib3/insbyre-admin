import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthUser } from 'features/github-auth';

export function PublicOnlyRoute({ children }: { children: Readonly<ReactNode> }) {
  const { data, isLoading } = useAuthUser();

  if (isLoading) return null;

  if (data) {
    return <Navigate to="/" replace />;
  }

  return children;
}
