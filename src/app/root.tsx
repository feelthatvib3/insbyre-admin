import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DashboardPage } from 'pages/dashboard';
import { LoginPage } from 'pages/login';

import { ProtectedRoute } from 'widgets/protected-route';
import { PublicOnlyRoute } from 'widgets/public-only-route';

export function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
