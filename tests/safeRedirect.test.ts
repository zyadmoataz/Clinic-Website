import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildBookingUrl,
  getSafeRedirectPath,
  parseBookingParams,
  sanitizeExternalUrl
} from '../src/utils/safeRedirect.ts';

describe('Security & Booking URL Utilities', () => {
  it('blocks open-redirect payloads while allowing safe relative routes', () => {
    assert.equal(getSafeRedirectPath('https://evil.com/phish', '/'), '/');
    assert.equal(getSafeRedirectPath('//evil.com', '/'), '/');
    assert.equal(getSafeRedirectPath('/\\evil.com', '/'), '/');
    assert.equal(getSafeRedirectPath('/javascript:alert(1)', '/'), '/');
    assert.equal(getSafeRedirectPath('', '/doctors'), '/doctors');

    const safeBooking = '/booking?doctorId=doc-1&serviceId=1&date=2026-11-18&slot=10%3A00';
    assert.equal(getSafeRedirectPath(safeBooking, '/'), safeBooking);
  });

  it('sanitizes external URLs against javascript/data XSS payloads', () => {
    assert.equal(sanitizeExternalUrl('javascript:alert(1)'), null);
    assert.equal(sanitizeExternalUrl('data:text/html,<script>alert(1)</script>'), null);
    assert.equal(
      sanitizeExternalUrl('https://meet.jit.si/medora-room'),
      'https://meet.jit.si/medora-room'
    );
    assert.equal(sanitizeExternalUrl('/images/hero-img.jpg'), '/images/hero-img.jpg');
  });

  it('round-trips booking query parameters cleanly across auth redirect', () => {
    const url = buildBookingUrl({
      doctorId: 'doc-1',
      serviceId: 2,
      date: '2026-11-20',
      timeSlot: '14:30'
    });
    assert.ok(url.startsWith('/booking?'));
    const parsed = parseBookingParams(url.split('?')[1]);
    assert.deepEqual(parsed, {
      doctorId: 'doc-1',
      serviceId: 2,
      date: '2026-11-20',
      timeSlot: '14:30'
    });
  });
});
