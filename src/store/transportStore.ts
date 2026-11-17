import { create } from 'zustand';
import { appEnv } from '@/config/env';

export type TransportSource = 'live-api' | 'browser-mock';

interface TransportState {
  source: TransportSource;
  isOnline: boolean;
  setSource: (source: TransportSource) => void;
  setOnline: (online: boolean) => void;
}

export const useTransportStore = create<TransportState>((set) => ({
  source: appEnv.dataMode === 'mock' ? 'browser-mock' : 'live-api',
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  setSource: (source) => set({ source }),
  setOnline: (isOnline) => set({ isOnline })
}));
