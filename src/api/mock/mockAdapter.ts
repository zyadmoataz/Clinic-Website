import {
  AxiosError,
  AxiosHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios';
import { dispatchMockRequest, MockHttpError } from './mockHandlers';

function parseBody(data: unknown): Record<string, unknown> {
  if (!data) return {};
  if (typeof data === 'string') {
    try {
      return JSON.parse(data) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  return data as Record<string, unknown>;
}

function normalizePath(url: string | undefined): string {
  if (!url) return '/';
  const cleaned = url.split('?')[0];
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
}

export async function runMockRequest(config: InternalAxiosRequestConfig): Promise<AxiosResponse> {
  await new Promise((resolve) => setTimeout(resolve, 140));
  const path = normalizePath(config.url);
  const params = (config.params as Record<string, unknown>) || {};
  const body = parseBody(config.data);
  const auth = (config.headers?.Authorization as string | undefined) || undefined;

  try {
    const data = dispatchMockRequest(config.method || 'GET', path, params, body, auth);
    return {
      data,
      status: config.method?.toUpperCase() === 'POST' ? 201 : 200,
      statusText: 'OK',
      headers: {},
      config
    };
  } catch (err) {
    const status = err instanceof MockHttpError ? err.status : 500;
    const message = err instanceof Error ? err.message : 'Mock server error';
    const headers = new AxiosHeaders();
    const response: AxiosResponse = {
      data: { message },
      status,
      statusText: message,
      headers,
      config
    };
    throw new AxiosError(message, String(status), config, undefined, response);
  }
}
