import type { MockDb } from './mockStorageTypes.ts';
import { computeOpenSlots, getNearestDates, toDoctorSummary } from './mockStorage.ts';

export function handleMockDoctors(
  upper: string,
  path: string,
  params: Record<string, unknown>,
  db: MockDb
): unknown | undefined {
  if (upper === 'GET' && path === '/doctors') {
    const search = String(params.search || '')
      .trim()
      .toLowerCase();
    const spec = String(params.specialization || '')
      .trim()
      .toLowerCase();
    const mode = String(params.mode || '')
      .trim()
      .toLowerCase();
    const availableOn = String(params.availableOn || '').trim();
    const items = db.doctors
      .filter((d) => {
        if (spec && d.specialization.toLowerCase() !== spec) return false;
        if (mode === 'online' && !d.supportsOnline) return false;
        if (availableOn && computeOpenSlots(db, d.id, availableOn).length === 0) return false;
        if (
          search &&
          !`${d.displayName} ${d.specialization} ${d.bio || ''}`.toLowerCase().includes(search)
        )
          return false;
        return true;
      })
      .map((d) => toDoctorSummary(db, d));
    return { items, page: 1, pageSize: 50, total: items.length };
  }

  const docMatch = path.match(/^\/doctors\/([^/]+)$/);
  if (upper === 'GET' && docMatch) {
    const doc = db.doctors.find((d) => d.id === docMatch[1]);
    if (!doc) return null;
    return { ...toDoctorSummary(db, doc), nearestAvailableDates: getNearestDates(db, doc.id, 7) };
  }

  const slotMatch = path.match(/^\/doctors\/([^/]+)\/slots$/);
  if (upper === 'GET' && slotMatch) {
    const date = String(params.date || '');
    const service = db.services.find((s) => s.id === Number(params.serviceId));
    return {
      date,
      slots: computeOpenSlots(db, slotMatch[1], date, service?.durationMinutes || 30)
    };
  }

  return undefined;
}
