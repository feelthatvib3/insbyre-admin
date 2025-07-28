import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthUser } from 'features/github-auth';

export function ProtectedRoute({ children }: { children: Readonly<ReactNode> }) {
  const { isLoading, isError, error } = useAuthUser();

  if (isLoading) return null;

  if (isError && (error as Error).message === '401') {
    return <Navigate to="/login" replace />;
  }

  return children;
}
