import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const token = useAuthStore((s) => s.token) || localStorage.getItem('auth_token');

  if (!isAuthenticated && !token) {
    const returnUrl = `${location.pathname}${location.search}`;
    const loginPath = `/login?redirect=${encodeURIComponent(returnUrl)}`;
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
