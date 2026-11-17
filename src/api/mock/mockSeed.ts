import type { Appointment, DoctorService } from '../../types/index.ts';
import { createSeedDoctors, type MockDoctorRecord } from './mockDoctorsSeed.ts';
import { createSeedServices } from './mockServicesSeed.ts';
import {
  createSeedAppointments,
  createSeedUsers,
  type MockUserRecord
} from './mockAppointmentsSeed.ts';

export type { MockDoctorRecord, MockUserRecord };

export interface MockDb {
  users: MockUserRecord[];
  doctors: MockDoctorRecord[];
  services: DoctorService[];
  appointments: Appointment[];
  nextAppointmentId: number;
  nextPaymentId: number;
}

export function createCanonicalMockSeed(): MockDb {
  return {
    users: createSeedUsers(),
    doctors: createSeedDoctors(),
    services: createSeedServices(),
    appointments: createSeedAppointments(),
    nextAppointmentId: 107,
    nextPaymentId: 907
  };
}
