import axios, { AxiosError, type AxiosAdapter } from 'axios';
import { appEnv } from '@/config/env';
import { useAuthStore } from '@/store/authStore';
import { useTransportStore } from '@/store/transportStore';
import { runMockRequest } from './mock/mockAdapter';

const defaultAdapter = axios.getAdapter(axios.defaults.adapter);
let apiBackoffUntil = 0;

function isLocalApiOnRemoteHost(): boolean {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  const isRemoteOrigin = host !== 'localhost' && host !== '127.0.0.1';
  const pointsToLocal =
    appEnv.apiBaseUrl.includes('localhost') || appEnv.apiBaseUrl.includes('127.0.0.1');
  return isRemoteOrigin && pointsToLocal;
}

const dualLayerAdapter: AxiosAdapter = async (config) => {
  const forceMock =
    appEnv.dataMode === 'mock' ||
    (appEnv.dataMode === 'auto' && (isLocalApiOnRemoteHost() || Date.now() < apiBackoffUntil));

  if (forceMock) {
    useTransportStore.getState().setSource('browser-mock');
    return runMockRequest(config);
  }

  try {
    const response = await defaultAdapter(config);
    useTransportStore.getState().setSource('live-api');
    return response;
  } catch (error) {
    const isNetworkError =
      error instanceof AxiosError && !error.response && error.code !== 'ERR_CANCELED';

    if (appEnv.dataMode === 'auto' && isNetworkError) {
      apiBackoffUntil = Date.now() + 15000;
      useTransportStore.getState().setSource('browser-mock');
      return runMockRequest(config);
    }
    throw error;
  }
};

export const apiClient = axios.create({
  baseURL: appEnv.apiBaseUrl,
  timeout: 1200,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  adapter: dualLayerAdapter
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token || localStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const url = error.config?.url || '';
    const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/register');
    if (error.response?.status === 401 && !isAuthEndpoint) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
