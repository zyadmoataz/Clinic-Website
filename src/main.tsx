import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import App from './App.tsx';
import { ErrorBoundary } from './components/feedback/ErrorBoundary.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { smartRetry } from './lib/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 1 minute (prevents immediate refetching)
      staleTime: 60 * 1000,
      // Unused data is garbage collected after 5 minutes (default)
      gcTime: 5 * 60 * 1000,
      // Do not refetch aggressively every time the browser window is focused
      refetchOnWindowFocus: false,
      // Retry transient failures (5xx, network, 408, 429) up to 2 times.
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
