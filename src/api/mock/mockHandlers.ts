import { toIsoDate } from '../../utils/dateCore.ts';
import {
  bookMockAppointment,
  cancelMockAppointment,
  payMockAppointment,
  rescheduleMockAppointment
} from './mockAppointmentActions.ts';
import { getAuthUser, handleMockAuth, MockHttpError } from './mockAuthHandlers.ts';
import { handleMockDoctors } from './mockDoctorsHandlers.ts';
import { loadMockDb, resetMockDb } from './mockStorage.ts';

export { MockHttpError };

export function dispatchMockRequest(
  method: string,
  path: string,
  params: Record<string, unknown>,
  body: Record<string, unknown>,
  authHeader?: string
): unknown {
  const db = loadMockDb();
  const upper = method.toUpperCase();

  if (upper === 'POST' && path === '/demo/reset') {
    resetMockDb();
    return { reset: true };
  }

  const authResult = handleMockAuth(upper, path, body, authHeader, db);
  if (authResult !== undefined) return authResult;

  const docResult = handleMockDoctors(upper, path, params, db);
  if (docResult === null) throw new MockHttpError(404, 'Doctor not found.');
  if (docResult !== undefined) return docResult;

  if (upper === 'POST' && path === '/appointments')
    return bookMockAppointment(db, body, authHeader);
  if (upper === 'POST' && path === '/payments/mock/pay')
    return payMockAppointment(db, body, authHeader);

  if (upper === 'GET' && path === '/me/appointments') {
    const user = getAuthUser(authHeader, db);
    const when = String(params.when || 'upcoming').toLowerCase();
    const status = String(params.status || '').toLowerCase();
    const today = toIsoDate();
    return db.appointments
      .filter((a) => {
        if (String(a.patientId) !== String(user.id)) return false;
        const isPast =
          a.date < today || ['completed', 'cancelled', 'noshow'].includes(a.status.toLowerCase());
        if (when === 'upcoming' && isPast) return false;
        if (when === 'past' && !isPast) return false;
        if (status && status !== 'all' && a.status.toLowerCase() !== status.replace('-', ''))
          return false;
        return true;
      })
      .sort((a, b) => `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`));
  }

  if (upper === 'GET' && path === '/me/prescriptions') {
    const user = getAuthUser(authHeader, db);
    return db.appointments
      .filter((a) => String(a.patientId) === String(user.id) && a.visit)
      .map((a) => ({
        ...a.visit,
        ticketCode: a.ticketCode,
        doctorName: a.doctorName,
        serviceName: a.serviceName
      }))
      .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  }

  const cancelMatch = path.match(/^\/appointments\/(\d+)\/cancel$/);
  if (upper === 'PUT' && cancelMatch)
    return cancelMockAppointment(db, Number(cancelMatch[1]), authHeader);

  const reschedMatch = path.match(/^\/appointments\/(\d+)\/reschedule$/);
  if (upper === 'PUT' && reschedMatch)
    return rescheduleMockAppointment(db, Number(reschedMatch[1]), body, authHeader);

  throw new MockHttpError(404, `Mock route not implemented: ${upper} ${path}`);
}
