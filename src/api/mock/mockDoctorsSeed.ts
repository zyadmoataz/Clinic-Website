import { addDaysIso } from '../../utils/dateCore.ts';

export interface MockDoctorRecord {
  id: string;
  displayName: string;
  specialization: string;
  photoUrl: string | null;
  bio: string | null;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  roomNumber: string;
  supportsOnline: boolean;
  availability: { dayOfWeek: string; startTime: string; endTime: string }[];
  blockedDates: string[];
}

const STANDARD_WEEK = [
  { dayOfWeek: 'Sunday', startTime: '09:00', endTime: '17:00' },
  { dayOfWeek: 'Monday', startTime: '09:00', endTime: '17:00' },
  { dayOfWeek: 'Tuesday', startTime: '09:00', endTime: '17:00' },
  { dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '17:00' },
  { dayOfWeek: 'Thursday', startTime: '10:00', endTime: '16:00' },
  { dayOfWeek: 'Saturday', startTime: '10:00', endTime: '15:00' }
];

export function createSeedDoctors(): MockDoctorRecord[] {
  return [
    {
      id: 'doc-1',
      displayName: 'Dr. Sarah Mansour',
      specialization: 'Cardiology',
      photoUrl: null,
      bio: 'Senior Consultant Cardiologist specializing in preventive cardiology, ECG diagnostics, and hypertension care.',
      rating: 4.9,
      reviewCount: 184,
      yearsExperience: 14,
      roomNumber: 'Suite 201',
      supportsOnline: true,
      availability: STANDARD_WEEK,
      blockedDates: [addDaysIso(5)]
    },
    {
      id: 'doc-2',
      displayName: 'Dr. Tarek Nabil',
      specialization: 'Dermatology',
      photoUrl: null,
      bio: 'Board-certified dermatologist focused on clinical skin diagnostics, acne therapy, and laser procedures.',
      rating: 4.8,
      reviewCount: 142,
      yearsExperience: 11,
      roomNumber: 'Suite 104',
      supportsOnline: true,
      availability: STANDARD_WEEK,
      blockedDates: []
    },
    {
      id: 'doc-3',
      displayName: 'Dr. Laila Farouk',
      specialization: 'Pediatrics',
      photoUrl: null,
      bio: 'Compassionate pediatric specialist covering newborn wellness, immunizations, and childhood respiratory care.',
      rating: 4.9,
      reviewCount: 215,
      yearsExperience: 16,
      roomNumber: 'Suite 108',
      supportsOnline: true,
      availability: STANDARD_WEEK,
      blockedDates: []
    },
    {
      id: 'doc-4',
      displayName: 'Dr. Omar Sherif',
      specialization: 'Orthopedics',
      photoUrl: null,
      bio: 'Sports medicine and orthopedic surgeon treating joint injuries, spine pain, and post-trauma rehabilitation.',
      rating: 4.7,
      reviewCount: 98,
      yearsExperience: 12,
      roomNumber: 'Suite 302',
      supportsOnline: false,
      availability: STANDARD_WEEK,
      blockedDates: []
    },
    {
      id: 'doc-5',
      displayName: 'Dr. Hana Zaki',
      specialization: 'Neurology',
      photoUrl: null,
      bio: 'Neurology specialist in migraine management, nerve conduction diagnostics, and sleep medicine.',
      rating: 4.9,
      reviewCount: 116,
      yearsExperience: 13,
      roomNumber: 'Suite 305',
      supportsOnline: true,
      availability: STANDARD_WEEK,
      blockedDates: []
    },
    {
      id: 'doc-6',
      displayName: 'Dr. Youssef Kamal',
      specialization: 'Dentistry',
      photoUrl: null,
      bio: 'Restorative and cosmetic dentist offering digital smile design, painless root canal care, and hygiene.',
      rating: 4.8,
      reviewCount: 164,
      yearsExperience: 10,
      roomNumber: 'Dental Wing B',
      supportsOnline: false,
      availability: STANDARD_WEEK,
      blockedDates: []
    }
  ];
}
