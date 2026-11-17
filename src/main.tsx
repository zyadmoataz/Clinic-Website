import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './index.css';
import './i18n';
import App from './App';
import { ErrorBoundary } from './components/feedback/ErrorBoundary';
import { smartRetry } from './lib/react-query';

if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('medora_theme');
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      retry: smartRetry
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
      <Toaster position="top-right" />
    </QueryClientProvider>
  </StrictMode>
);
