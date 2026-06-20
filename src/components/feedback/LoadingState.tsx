// ==========================================
// OWNER: Omar, Helda
// PURPOSE: Full container loading feedback
// ==========================================
import React from 'react';
import { Spinner } from '../ui/Spinner';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="bg-surface border-border duration-normal flex min-h-[250px] flex-col items-center justify-center rounded-lg border p-8 text-center transition-colors">
      <Spinner className="text-primary mb-3 h-8 w-8" />
      <p className="text-muted text-sm font-medium">{message}</p>
    </div>
  );
}
