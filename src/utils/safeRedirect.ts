export interface BookingDraftParams {
  doctorId: string;
  doctorName?: string;
  serviceId: number;
  serviceName?: string;
  price?: number;
  date: string;
  timeSlot: string;
}

/**
 * Validates post-authentication redirect paths to prevent open-redirect attacks.
 */
export function getSafeRedirectPath(rawPath: string | null | undefined, fallback = '/'): string {
  if (!rawPath || typeof rawPath !== 'string') return fallback;
  const trimmed = rawPath.trim();
  if (!trimmed.startsWith('/') || trimmed.startsWith('//') || trimmed.startsWith('/\\')) {
    return fallback;
  }
  if (/^\/[a-zA-Z]+:/.test(trimmed)) return fallback;
  return trimmed;
}

/**
 * Restricts user-supplied media/meeting URLs to safe https/http or relative paths.
 */
export function sanitizeExternalUrl(url: string | undefined | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return trimmed;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') return parsed.toString();
  } catch {
    return null;
  }
  return null;
}

export function buildBookingUrl(draft: BookingDraftParams): string {
  const params = new URLSearchParams({
    doctorId: String(draft.doctorId),
    serviceId: String(draft.serviceId),
    date: draft.date,
    slot: draft.timeSlot
  });
  return `/booking?${params.toString()}`;
}

export function parseBookingParams(search: string): Partial<BookingDraftParams> | null {
  const params = new URLSearchParams(search);
  const doctorId = params.get('doctorId');
  const serviceId = Number(params.get('serviceId'));
  const date = params.get('date');
  const timeSlot = params.get('slot');
  if (!doctorId || !serviceId || !date || !timeSlot) return null;
  return { doctorId, serviceId, date, timeSlot };
}
