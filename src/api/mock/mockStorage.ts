import { addDaysIso, parseLocalDate, toIsoDate } from '../../utils/dateCore.ts';
import type { DoctorSummary } from '../../types/index.ts';
import { createCanonicalMockSeed, type MockDb, type MockDoctorRecord } from './mockSeed.ts';

const STORAGE_KEY = 'medora_clinic_mock_db_v3';
const LEGACY_KEYS = ['clarity_clinic_mock_db_v1', 'clarity_clinic_mock_db_v2'];

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function loadMockDb(): MockDb {
  if (typeof window === 'undefined') return createCanonicalMockSeed();
  for (const key of LEGACY_KEYS) localStorage.removeItem(key);
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seed = createCanonicalMockSeed();
    saveMockDb(seed);
    return seed;
  }
  try {
    return JSON.parse(raw) as MockDb;
  } catch {
    const seed = createCanonicalMockSeed();
    saveMockDb(seed);
    return seed;
  }
}

export function saveMockDb(db: MockDb): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  }
}

export function resetMockDb(): MockDb {
  const seed = createCanonicalMockSeed();
  saveMockDb(seed);
  return seed;
}

export function formatMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function parseMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function computeOpenSlots(
  db: MockDb,
  doctorId: string,
  date: string,
  stepMinutes = 30
): string[] {
  const doc = db.doctors.find((d) => d.id === doctorId);
  if (!doc || !date || date < toIsoDate()) return [];
  if (doc.blockedDates.includes(date)) return [];

  const dayName = DAY_NAMES[parseLocalDate(date).getDay()];
  const windows = doc.availability.filter((w) => w.dayOfWeek === dayName);
  if (!windows.length) return [];

  const taken = new Set(
    db.appointments
      .filter((a) => String(a.doctorId) === doctorId && a.date === date && a.status !== 'Cancelled')
      .map((a) => a.startTime)
  );

  const open = new Set<string>();
  for (const w of windows) {
    const start = parseMinutes(w.startTime);
    const end = parseMinutes(w.endTime);
    for (let t = start; t + stepMinutes <= end; t += 30) {
      const slot = formatMinutes(t);
      if (!taken.has(slot)) open.add(slot);
    }
  }
  return Array.from(open).sort();
}

export function getNearestDates(db: MockDb, doctorId: string, limit = 7): string[] {
  const dates: string[] = [];
  for (let i = 0; i <= 14 && dates.length < limit; i++) {
    const iso = addDaysIso(i);
    if (computeOpenSlots(db, doctorId, iso).length > 0) dates.push(iso);
  }
  return dates;
}

export function toDoctorSummary(db: MockDb, doc: MockDoctorRecord): DoctorSummary {
  const services = db.services.filter((s) => s.doctorId === doc.id);
  const nearest = getNearestDates(db, doc.id, 6);
  const nextAvailableDate = nearest[0] ?? null;
  const nextAvailableSlot = nextAvailableDate
    ? (computeOpenSlots(db, doc.id, nextAvailableDate)[0] ?? null)
    : null;
  return {
    id: doc.id,
    displayName: doc.displayName,
    specialization: doc.specialization,
    photoUrl: doc.photoUrl,
    bio: doc.bio,
    services,
    rating: doc.rating,
    reviewCount: doc.reviewCount,
    yearsExperience: doc.yearsExperience,
    roomNumber: doc.roomNumber,
    supportsOnline: doc.supportsOnline,
    nextAvailableDate,
    nextAvailableSlot
  };
}

export function nextQueueToken(db: MockDb, doctorId: string, date: string): string {
  const count = db.appointments.filter(
    (a) => String(a.doctorId) === doctorId && a.date === date
  ).length;
  return `A-${String(count + 1).padStart(2, '0')}`;
}
