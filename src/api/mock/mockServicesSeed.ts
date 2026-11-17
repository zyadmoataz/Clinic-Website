import type { DoctorService } from '../../types/index.ts';

export function createSeedServices(): DoctorService[] {
  return [
    {
      id: 1,
      name: 'Cardiac Consultation & ECG',
      durationMinutes: 30,
      price: 450,
      doctorId: 'doc-1',
      doctorName: 'Dr. Sarah Mansour'
    },
    {
      id: 2,
      name: 'Echocardiography Follow-up',
      durationMinutes: 45,
      price: 650,
      doctorId: 'doc-1',
      doctorName: 'Dr. Sarah Mansour'
    },
    {
      id: 3,
      name: 'Dermatology Skin Exam',
      durationMinutes: 30,
      price: 350,
      doctorId: 'doc-2',
      doctorName: 'Dr. Tarek Nabil'
    },
    {
      id: 4,
      name: 'Acne & Scar Treatment Plan',
      durationMinutes: 30,
      price: 500,
      doctorId: 'doc-2',
      doctorName: 'Dr. Tarek Nabil'
    },
    {
      id: 5,
      name: 'Pediatric Wellness Check',
      durationMinutes: 30,
      price: 320,
      doctorId: 'doc-3',
      doctorName: 'Dr. Laila Farouk'
    },
    {
      id: 6,
      name: 'Childhood Immunization Visit',
      durationMinutes: 30,
      price: 400,
      doctorId: 'doc-3',
      doctorName: 'Dr. Laila Farouk'
    },
    {
      id: 7,
      name: 'Orthopedic Joint Assessment',
      durationMinutes: 30,
      price: 480,
      doctorId: 'doc-4',
      doctorName: 'Dr. Omar Sherif'
    },
    {
      id: 8,
      name: 'Sports Injury Rehabilitation',
      durationMinutes: 45,
      price: 600,
      doctorId: 'doc-4',
      doctorName: 'Dr. Omar Sherif'
    },
    {
      id: 9,
      name: 'Neurology & Migraine Consult',
      durationMinutes: 30,
      price: 520,
      doctorId: 'doc-5',
      doctorName: 'Dr. Hana Zaki'
    },
    {
      id: 10,
      name: 'Dental Checkup & Scaling',
      durationMinutes: 30,
      price: 380,
      doctorId: 'doc-6',
      doctorName: 'Dr. Youssef Kamal'
    }
  ];
}
