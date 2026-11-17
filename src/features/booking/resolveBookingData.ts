import type { DoctorDetail } from '@/types';
import type { BookingDraftParams } from '@/utils/safeRedirect';

export function resolveBookingData(
  routeState: Partial<BookingDraftParams> | null,
  urlParams: Partial<BookingDraftParams> | null,
  draft: BookingDraftParams | null,
  doctor: DoctorDetail | undefined
): BookingDraftParams | null {
  const doctorId = routeState?.doctorId || urlParams?.doctorId || draft?.doctorId;
  const serviceId = routeState?.serviceId || urlParams?.serviceId || draft?.serviceId;
  const date = routeState?.date || urlParams?.date || draft?.date;
  const timeSlot = routeState?.timeSlot || urlParams?.timeSlot || draft?.timeSlot;

  if (!doctorId || !serviceId || !date || !timeSlot) return null;

  const matchedService = doctor?.services.find((s) => s.id === serviceId);
  return {
    doctorId,
    doctorName: routeState?.doctorName || doctor?.displayName || draft?.doctorName || '',
    serviceId,
    serviceName: routeState?.serviceName || matchedService?.name || draft?.serviceName || '',
    price: routeState?.price ?? matchedService?.price ?? draft?.price ?? 0,
    date,
    timeSlot
  };
}
