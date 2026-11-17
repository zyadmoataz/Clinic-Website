import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Database, RotateCcw, WifiOff, X } from 'lucide-react';
import { apiClient } from '@/api/apiClient';
import { resetMockDb } from '@/api/mock/mockStorage';
import { showToast } from '@/lib/toast';
import { useTransportStore } from '@/store/transportStore';

export function DemoStatusBanner() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { source, isOnline } = useTransportStore();
  const [dismissed, setDismissed] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleResetDemo = async () => {
    setResetting(true);
    try {
      if (source === 'live-api') {
        await apiClient.post('/demo/reset');
      }
      resetMockDb();
      await queryClient.invalidateQueries();
      showToast.success(t('demo.reset_success', 'Demo clinic data restored to initial state.'));
    } catch {
      resetMockDb();
      await queryClient.invalidateQueries();
    } finally {
      setResetting(false);
    }
  };

  if (!isOnline) {
    return (
      <div
        role="status"
        className="bg-danger text-on-primary no-print px-4 py-2 text-center text-xs font-semibold"
      >
        <span className="inline-flex items-center gap-2">
          <WifiOff className="h-3.5 w-3.5" />
          {t(
            'demo.offline_notice',
            'You are currently offline. Live requests are paused until your connection returns.'
          )}
        </span>
      </div>
    );
  }

  if (dismissed) return null;

  return (
    <div className="bg-surface-2 border-border no-print border-b px-4 py-1.5 text-xs">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="text-muted flex items-center gap-2">
          <Database className="text-accent h-3.5 w-3.5 shrink-0" />
          <span>
            {source === 'live-api'
              ? t(
                  'demo.live_sync',
                  'Connected to shared Clinic Mock API (synced with Staff Dashboard).'
                )
              : t(
                  'demo.browser_mock',
                  'Demo Mode: running on stateful in-browser mock clinic data.'
                )}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={resetting}
            onClick={handleResetDemo}
            className="text-primary hover:text-primary-hover inline-flex cursor-pointer items-center gap-1 font-semibold disabled:opacity-50"
          >
            <RotateCcw className="h-3 w-3" />
            {t('demo.reset_btn', 'Reset Demo')}
          </button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss status notice"
            className="text-muted hover:text-text cursor-pointer rounded p-0.5"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
