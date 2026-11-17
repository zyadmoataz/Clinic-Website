import { sanitizeExternalUrl } from '../../utils/safeRedirect.ts';
import type { User } from '../../types/index.ts';
import type { MockDb, MockUserRecord } from './mockStorageTypes.ts';
import { saveMockDb } from './mockStorage.ts';

export class MockHttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function makeMockToken(userId: string): string {
  return `mock-jwt.${btoa(userId)}`;
}

export function getAuthUser(authHeader: string | undefined, db: MockDb): MockUserRecord {
  if (!authHeader?.startsWith('Bearer ')) throw new MockHttpError(401, 'Authentication required.');
  const raw = authHeader.slice(7).trim();
  if (raw.startsWith('mock-jwt.')) {
    try {
      const id = atob(raw.slice(9));
      const found = db.users.find((u) => u.id === id);
      if (found) return found;
    } catch {
      throw new MockHttpError(401, 'Session expired.');
    }
  }
  const storedRaw = typeof window !== 'undefined' ? localStorage.getItem('auth_user') : null;
  if (storedRaw) {
    const parsed = JSON.parse(storedRaw) as User;
    const found = db.users.find((u) => String(u.id) === String(parsed.id));
    if (found) return found;
  }
  throw new MockHttpError(401, 'Session expired. Please sign in again.');
}

function toPublicUser(u: MockUserRecord): User {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    displayName: u.displayName || u.name,
    role: u.role,
    phone: u.phone,
    avatarUrl: u.avatarUrl || '',
    isActive: true
  };
}

export function handleMockAuth(
  upper: string,
  path: string,
  body: Record<string, unknown>,
  authHeader: string | undefined,
  db: MockDb
): unknown | undefined {
  if (upper === 'POST' && path === '/auth/login') {
    const email = String(body.email || '')
      .trim()
      .toLowerCase();
    const user = db.users.find(
      (u) => u.email.toLowerCase() === email && u.password === body.password
    );
    if (!user) throw new MockHttpError(401, 'Invalid email or password.');
    return { token: makeMockToken(String(user.id)), user: toPublicUser(user) };
  }

  if (upper === 'POST' && path === '/auth/register') {
    const email = String(body.email || '')
      .trim()
      .toLowerCase();
    if (db.users.some((u) => u.email.toLowerCase() === email)) {
      throw new MockHttpError(409, 'This email is already registered. Sign in instead.');
    }
    const displayName = String(body.displayName || '').trim();
    const user: MockUserRecord = {
      id: `usr-patient-${Date.now()}`,
      email,
      password: String(body.password || ''),
      name: displayName,
      displayName,
      role: 'patient',
      phone: String(body.phone || ''),
      avatarUrl: '',
      isActive: true
    };
    db.users.push(user);
    saveMockDb(db);
    return { token: makeMockToken(String(user.id)), user: toPublicUser(user) };
  }

  if (upper === 'POST' && path === '/auth/forgot-password') {
    return { message: 'If an account matches this email, reset instructions were sent.' };
  }

  if (upper === 'GET' && path === '/auth/me') {
    return toPublicUser(getAuthUser(authHeader, db));
  }

  if (upper === 'PUT' && path === '/auth/profile') {
    const user = getAuthUser(authHeader, db);
    if (body.displayName) {
      user.name = String(body.displayName).trim();
      user.displayName = user.name;
    }
    if (body.phone !== undefined) user.phone = String(body.phone).trim();
    if (body.avatarUrl !== undefined)
      user.avatarUrl = sanitizeExternalUrl(String(body.avatarUrl)) || '';
    saveMockDb(db);
    return toPublicUser(user);
  }

  if (upper === 'PUT' && path === '/auth/change-password') {
    const user = getAuthUser(authHeader, db);
    if (body.current !== user.password)
      throw new MockHttpError(400, 'Current password is incorrect.');
    if (!body.new || body.new === body.current)
      throw new MockHttpError(400, 'Choose a different new password.');
    user.password = String(body.new);
    saveMockDb(db);
    return { updated: true };
  }

  return undefined;
}
