import { AxiosError } from 'axios';

/**
 * Smart retry policy for React Query.
 *
 * By default, React Query retries EVERY failed request. But we shouldn't do that:
 *   - Errors like 400 (Bad Request), 401 (Unauthorized), or 404 (Not Found) mean
 *     the input is wrong or the data doesn't exist. Retrying these won't fix anything,
 *     it will just fail again and waste time.
 *   - Errors like 500 (Server crashes), network failures, or timeouts (408, 429)
 *     are temporary glitches. These ARE worth retrying because they might work on the second try.
 */
export function smartRetry(failureCount: number, error: unknown): boolean {
  // First, we check if the error is an object that came from an API response
  if (error && typeof error === 'object') {
    // TypeScript sees 'error' as "unknown". We use 'as AxiosError' to tell TypeScript:
    // "Treat this as an Axios error so we get autocomplete and can read the status code."
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;

    // If it's a 4xx error (like 400 or 404), DO NOT retry.
    // The exceptions are 408 (Timeout) and 429 (Too many requests) which we DO want to retry.
    if (status && status >= 400 && status < 500 && status !== 408 && status !== 429) {
      return false; // Skip retry
    }
  }

  // For temporary glitches (like 5xx server errors or network disconnects), allow up to 2 retries.
  return failureCount < 2;
}
