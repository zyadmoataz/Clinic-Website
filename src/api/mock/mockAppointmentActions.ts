import { getAuthUser, MockHttpError } from './mockAuthHandlers.ts';
import { computeOpenSlots, formatMinutes, nextQueueToken, saveMockDb } from './mockStorage.ts';
import type { MockDb } from './mockStorageTypes.ts';

export function bookMockAppointment(
  db: MockDb,
  body: Record<string, unknown>,
  authHeader: string | undefined
) {
  const user = getAuthUser(authHeader, db);
  const doctor = db.doctors.find((d) => d.id === String(body.doctorId));
  const service = db.services.find((s) => s.id === Number(body.serviceId));
  const date = String(body.date || '');
  const startTime = String(body.startTime || '');
  if (!doctor || !service || !date || !startTime)
    throw new MockHttpError(400, 'Missing booking details.');
  if (!computeOpenSlots(db, doctor.id, date, service.durationMinutes).includes(startTime)) {
    throw new MockHttpError(409, 'This time slot was just reserved. Please select another slot.');
  }

  const id = db.nextAppointmentId++;
  const paymentId = db.nextPaymentId++;
  const ticketCode = `MDR-${new Date().getFullYear()}-${String(id).padStart(4, '0')}`;
  const isOnline = body.mode === 'Online';
  const [h, m] = startTime.split(':').map(Number);
  const endTime = formatMinutes((h || 0) * 60 + (m || 0) + service.durationMinutes);

  const appt = {
    id,
    ticketCode,
    queueToken: nextQueueToken(db, doctor.id, date),
    roomNumber: isOnline ? `Telehealth Room ${(id % 4) + 1}` : doctor.roomNumber,
    patientId: user.id,
    patientName: user.name,
    doctorId: doctor.id,
    doctorName: doctor.displayName,
    serviceId: service.id,
    serviceName: service.name,
    date,
    startTime,
    endTime,
    mode: String(body.mode || 'InClinic'),
    status: body.paymentMethod === 'Online' ? 'PendingPayment' : 'Confirmed',
    paymentMethod: String(body.paymentMethod || 'Cash'),
    meetingLink: isOnline ? `https://meet.jit.si/medora-${ticketCode.toLowerCase()}` : '',
    notes: String(body.notes || '').slice(0, 400),
    price: service.price,
    createdByRole: user.role,
    createdAt: new Date().toISOString(),
    payment: {
      id: paymentId,
      amount: service.price,
      method: String(body.paymentMethod || 'Cash'),
      status: 'Pending',
      transactionRef: `REF-${ticketCode}`,
      paidAt: null
    },
    visit: null
  };
  db.appointments.push(appt);
  saveMockDb(db);
  return {
    appointment: appt,
    payment: { id: paymentId, checkoutUrl: `/booking/confirmation?ticket=${ticketCode}` }
  };
}

export function payMockAppointment(
  db: MockDb,
  body: Record<string, unknown>,
  authHeader: string | undefined
) {
  getAuthUser(authHeader, db);
  const appt = db.appointments.find((a) => a.id === Number(body.appointmentId));
  if (!appt) throw new MockHttpError(404, 'Appointment not found.');
  if (appt.payment) {
    appt.payment.status = String(body.status || 'Paid');
    appt.payment.paidAt = new Date().toISOString();
  }
  if (body.status === 'Paid' && appt.status === 'PendingPayment') appt.status = 'Confirmed';
  saveMockDb(db);
  return { paid: body.status === 'Paid', appointment: appt };
}

export function cancelMockAppointment(db: MockDb, id: number, authHeader: string | undefined) {
  const user = getAuthUser(authHeader, db);
  const appt = db.appointments.find((a) => a.id === id && String(a.patientId) === String(user.id));
  if (!appt) throw new MockHttpError(404, 'Appointment not found.');
  appt.status = 'Cancelled';
  if (appt.payment?.status === 'Paid') appt.payment.status = 'Refunded';
  saveMockDb(db);
  return appt;
}

export function rescheduleMockAppointment(
  db: MockDb,
  id: number,
  body: Record<string, unknown>,
  authHeader: string | undefined
) {
  const user = getAuthUser(authHeader, db);
  const appt = db.appointments.find((a) => a.id === id && String(a.patientId) === String(user.id));
  if (!appt) throw new MockHttpError(404, 'Appointment not found.');
  const date = String(body.date || '');
  const startTime = String(body.startTime || '');
  if (!computeOpenSlots(db, String(appt.doctorId), date).includes(startTime)) {
    throw new MockHttpError(409, 'Selected time slot is no longer available.');
  }
  appt.date = date;
  appt.startTime = startTime;
  const [h, m] = startTime.split(':').map(Number);
  appt.endTime = formatMinutes((h || 0) * 60 + (m || 0) + 30);
  saveMockDb(db);
  return appt;
}
