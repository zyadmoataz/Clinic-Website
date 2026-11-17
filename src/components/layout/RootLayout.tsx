import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { useAuthMeQuery } from '@/api/queries/authMe.query';
import { useAuthStore } from '@/store/authStore';
import { useTransportStore } from '@/store/transportStore';
import { DemoStatusBanner } from './DemoStatusBanner';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function RootLayout() {
  const queryClient = useQueryClient();
  const token = useAuthStore((s) => s.token);
  const { updateUser, logout, isAuthenticated } = useAuthStore();
  const setOnline = useTransportStore((s) => s.setOnline);

  const { data: user, isError } = useAuthMeQuery(!!token && isAuthenticated);

  useEffect(() => {
    if (user) updateUser(user);
  }, [user, updateUser]);

  useEffect(() => {
    if (isError && token) logout();
  }, [isError, token, logout]);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'medora_clinic_mock_db_v3') {
        void queryClient.invalidateQueries();
      }
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('storage', handleStorage);
    };
  }, [queryClient, setOnline]);

  return (
    <div className="selection:bg-primary-soft selection:text-primary flex min-h-screen flex-col font-sans">
      <a
        href="#main-content"
        className="bg-primary text-on-primary sr-only z-50 rounded-lg px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        Skip to content
      </a>
      <DemoStatusBanner />
      <Navbar />
      <main id="main-content" className="w-full flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
