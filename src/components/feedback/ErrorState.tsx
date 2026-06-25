import { useTranslation } from 'react-i18next';
// ==========================================
// OWNER: Omar, Helda
// PURPOSE: Shared UI Component - Error State
// ==========================================
import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Something went wrong while loading data.',
  onRetry
}: ErrorStateProps) {
  const { t } = useTranslation();
  return (
    <div className="bg-danger-soft border-danger-soft flex flex-col items-center justify-center rounded-xl border px-4 py-12 text-center">
      <AlertCircle className="text-danger mb-4 h-10 w-10" />
      <h3 className="text-danger mb-2 text-lg font-bold">{t('common.error_occurred')}</h3>
      <p className="text-danger/80 mb-6 max-w-sm text-sm">{message}</p>
      {onRetry && (
        <Button className="bg-red-500 text-white hover:bg-red-600" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
