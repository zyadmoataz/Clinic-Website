import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { addDaysIso } from '../src/utils/dateCore.ts';
import { createCanonicalMockSeed } from '../src/api/mock/mockSeed.ts';
import { MockHttpError } from '../src/api/mock/mockAuthHandlers.ts';

// Minimal in-memory localStorage polyfill for Node unit testing
const memoryStorage = new Map<string, string>();
Object.defineProperty(globalThis, 'window', { value: globalThis, configurable: true });
Object.defineProperty(globalThis, 'localStorage', {
  value: {
    getItem: (k: string) => memoryStorage.get(k) ?? null,
    setItem: (k: string, v: string) => memoryStorage.set(k, v),
    removeItem: (k: string) => memoryStorage.delete(k),
    clear: () => memoryStorage.clear()
  },
  configurable: true
});

const { dispatchMockRequest } = await import('../src/api/mock/mockHandlers.ts');

describe('Patient Website In-Browser Mock Adapter', () => {
  beforeEach(() => {
    memoryStorage.clear();
    memoryStorage.set('medora_clinic_mock_db_v3', JSON.stringify(createCanonicalMockSeed()));
  });

  it('allows public doctor & slot inspection without auth, and enforces auth on booking', () => {
    const docs = dispatchMockRequest('GET', '/doctors', {}, {}) as { items: { id: string }[] };
    assert.ok(docs.items.length >= 6);

    assert.throws(
      () =>
        dispatchMockRequest(
          'POST',
          '/appointments',
          {},
          {
            doctorId: 'doc-1',
            serviceId: 1,
            date: addDaysIso(1),
            startTime: '09:30'
          }
        ),
      (err: unknown) => err instanceof MockHttpError && err.status === 401
    );
  });

  it('books ticket, prevents 409 double booking, and frees slot on cancel', () => {
    const auth = dispatchMockRequest(
      'POST',
      '/auth/login',
      {},
      {
        email: 'patient@medoraclinics.com',
        password: 'Password123'
      }
    ) as { token: string };

    const targetDate = addDaysIso(2);
    const slotRes = dispatchMockRequest(
      'GET',
      '/doctors/doc-1/slots',
      { date: targetDate, serviceId: 1 },
      {}
    ) as { slots: string[] };
    const chosen = slotRes.slots[0];

    const created = dispatchMockRequest(
      'POST',
      '/appointments',
      {},
      {
        doctorId: 'doc-1',
        serviceId: 1,
        date: targetDate,
        startTime: chosen,
        mode: 'InClinic',
        paymentMethod: 'Cash'
      },
      `Bearer ${auth.token}`
    ) as { appointment: { id: number; ticketCode: string } };

    assert.ok(created.appointment.ticketCode.startsWith('MDR-'));

    assert.throws(
      () =>
        dispatchMockRequest(
          'POST',
          '/appointments',
          {},
          {
            doctorId: 'doc-1',
            serviceId: 1,
            date: targetDate,
            startTime: chosen,
            mode: 'InClinic',
            paymentMethod: 'Cash'
          },
          `Bearer ${auth.token}`
        ),
      (err: unknown) => err instanceof MockHttpError && err.status === 409
    );

    dispatchMockRequest(
      'PUT',
      `/appointments/${created.appointment.id}/cancel`,
      {},
      {},
      `Bearer ${auth.token}`
    );
    const afterCancel = dispatchMockRequest(
      'GET',
      '/doctors/doc-1/slots',
      { date: targetDate, serviceId: 1 },
      {}
    ) as { slots: string[] };
    assert.ok(afterCancel.slots.includes(chosen));
  });
});
