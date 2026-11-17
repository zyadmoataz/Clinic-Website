import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().default('http://localhost:5000/api'),
  VITE_DATA_MODE: z.enum(['auto', 'api', 'mock']).default('auto')
});

const parsed = envSchema.safeParse({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL || undefined,
  VITE_DATA_MODE: import.meta.env.VITE_DATA_MODE || undefined
});

export const appEnv = {
  apiBaseUrl: parsed.success ? parsed.data.VITE_API_BASE_URL : 'http://localhost:5000/api',
  dataMode: parsed.success ? parsed.data.VITE_DATA_MODE : ('auto' as const)
};
