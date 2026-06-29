import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useAuthMeQuery } from '@/api/queries/authMe.query';
import { useAuthStore } from '../../store/authStore';

export function RootLayout() {
  const token = localStorage.getItem('auth_token');
  const { login, logout, isAuthenticated } = useAuthStore();

  // Try to fetch user data if a token exists in localStorage but we aren't authenticated yet
  const { data: user, isError } = useAuthMeQuery(!!token && !isAuthenticated);

  useEffect(() => {
    if (user && token && !isAuthenticated) {
      // If we got the user data back, hydrate the store!
      login(user, token);
    }
  }, [user, token, isAuthenticated, login]);

  useEffect(() => {
    if (isError) {
      // If the token was invalid (e.g., expired), clear it out
      logout();
    }
  }, [isError, logout]);

  return (
    <div className="selection:bg-primary-soft selection:text-primary flex min-h-screen flex-col font-sans">
      <Navbar />
      <main className="w-full flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
