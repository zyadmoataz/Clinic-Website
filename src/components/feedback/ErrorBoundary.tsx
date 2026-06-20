import { type ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { ErrorState } from './ErrorState';

// A simple React function component that wraps the app and catches rendering errors
export function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ReactErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
        // This fallback UI is shown ONLY when a crash is caught
        <div className="flex h-screen items-center justify-center p-4">
          <div className="w-full max-w-md">
            <ErrorState
              onRetry={() => {
                resetErrorBoundary(); // Clear the boundary error state
                window.location.reload(); // Reload the page to recover
              }}
            />
          </div>
        </div>
      )}
    >
      {children}
    </ReactErrorBoundary>
  );
}
