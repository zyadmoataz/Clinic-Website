import { addDaysIso } from '../../utils/dateCore.ts';
import type { Appointment, User } from '../../types/index.ts';

export interface MockUserRecord extends User {
  password: string;
}

export function createSeedUsers(): MockUserRecord[] {
  return [
    {
      id: 'usr-patient-1',
      email: 'patient@medoraclinics.com',
      password: 'Password123',
      name: 'Nour El-Din Hassan',
      displayName: 'Nour El-Din Hassan',
      role: 'patient',
      phone: '01012345678',
      avatarUrl: '',
      isActive: true
    }
  ];
}

export function createSeedAppointments(): Appointment[] {
  const today = addDaysIso(0);
  const tomorrow = addDaysIso(1);
  const dayMinus4 = addDaysIso(-4);
  const dayMinus10 = addDaysIso(-10);

  return [
    {
      id: 101,
      ticketCode: 'MDR-2026-0101',
      queueToken: 'A-01',
      roomNumber: 'Suite 201',
      patientId: 'usr-patient-1',
      patientName: 'Nour El-Din Hassan',
      doctorId: 'doc-1',
      doctorName: 'Dr. Sarah Mansour',
      serviceId: 1,
      serviceName: 'Cardiac Consultation & ECG',
      date: today,
      startTime: '11:00',
      endTime: '11:30',
      mode: 'InClinic',
      status: 'Arrived',
      paymentMethod: 'Online',
      meetingLink: '',
      notes: 'Annual blood pressure & ECG review',
      price: 450,
      createdByRole: 'patient',
      createdAt: `${dayMinus4}T10:15:00Z`,
      payment: {
        id: 901,
        amount: 450,
        method: 'Online',
        status: 'Paid',
        transactionRef: 'TXN-MDR-9012',
        paidAt: `${dayMinus4}T10:17:00Z`
      },
      visit: null
    },
    {
      id: 102,
      ticketCode: 'MDR-2026-0102',
      queueToken: 'A-02',
      roomNumber: 'Telehealth Room 1',
      patientId: 'usr-patient-1',
      patientName: 'Nour El-Din Hassan',
      doctorId: 'doc-5',
      doctorName: 'Dr. Hana Zaki',
      serviceId: 9,
      serviceName: 'Neurology & Migraine Consult',
      date: tomorrow,
      startTime: '14:00',
      endTime: '14:30',
      mode: 'Online',
      status: 'Confirmed',
      paymentMethod: 'Cash',
      meetingLink: 'https://meet.jit.si/medora-clinics-mdr-2026-0102',
      notes: 'Recurring tension headaches over past 2 weeks',
      price: 520,
      createdByRole: 'patient',
      createdAt: `${today}T08:30:00Z`,
      payment: {
        id: 902,
        amount: 520,
        method: 'Cash',
        status: 'Pending',
        transactionRef: 'CASH-MDR-902',
        paidAt: null
      },
      visit: null
    },
    {
      id: 105,
      ticketCode: 'MDR-2026-0105',
      queueToken: 'A-01',
      roomNumber: 'Suite 104',
      patientId: 'usr-patient-1',
      patientName: 'Nour El-Din Hassan',
      doctorId: 'doc-2',
      doctorName: 'Dr. Tarek Nabil',
      serviceId: 3,
      serviceName: 'Dermatology Skin Exam',
      date: dayMinus10,
      startTime: '13:00',
      endTime: '13:30',
      mode: 'InClinic',
      status: 'Completed',
      paymentMethod: 'Online',
      meetingLink: '',
      notes: 'Seasonal eczema flare-up',
      price: 350,
      createdByRole: 'patient',
      createdAt: `${dayMinus10}T09:00:00Z`,
      payment: {
        id: 905,
        amount: 350,
        method: 'Online',
        status: 'Paid',
        transactionRef: 'TXN-MDR-905',
        paidAt: `${dayMinus10}T09:02:00Z`
      },
      visit: {
        id: 502,
        appointmentId: 105,
        doctorName: 'Dr. Tarek Nabil',
        serviceName: 'Dermatology Skin Exam',
        ticketCode: 'MDR-2026-0105',
        diagnosis: 'Atopic dermatitis (mild localized flare)',
        notes: 'Apply emollient twice daily after bathing; avoid fragranced soaps.',
        createdAt: `${dayMinus10}T13:35:00Z`,
        editableUntil: `${dayMinus4}T13:35:00Z`,
        isEditable: false,
        prescription: [
          { drug: 'Hydrocortisone 1% Cream', dosage: 'Thin layer twice daily', duration: '7 days' },
          {
            drug: 'Cetaphil Moisturizing Balm',
            dosage: 'Apply liberally 2-3 times daily',
            duration: '30 days'
          }
        ]
      }
    }
  ];
}
