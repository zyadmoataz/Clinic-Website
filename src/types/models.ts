export interface Prescription {
  drug: string;
  dosage: string;
  duration: string;
  frequency?: string;
}

export interface Visit {
  id: number;
  appointmentId: number;
  diagnosis: string;
  notes: string;
  createdAt: string;
  editableUntil: string;
  isEditable: boolean;
  doctorName?: string;
  serviceName?: string;
  ticketCode?: string;
  prescription: Prescription[];
}

export interface Payment {
  id: number;
  amount: number;
  method: string;
  status: string;
  transactionRef: string;
  paidAt: string | null;
}

export interface Service {
  id: string | number;
  name: string;
  durationMinutes?: number;
  price?: number;
}

export interface Doctor {
  id: string | number;
  displayName: string;
  specialization: string;
  photoUrl?: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  roomNumber?: string;
  supportsOnline?: boolean;
  services?: Service[];
}

export interface User {
  id: string | number;
  email: string;
  name: string;
  displayName?: string;
  role: 'patient' | 'doctor' | 'admin' | 'receptionist';
  phone: string;
  avatarUrl?: string;
  isActive?: boolean;
}

export type AppointmentStatus =
  | 'PendingPayment'
  | 'Confirmed'
  | 'Arrived'
  | 'Completed'
  | 'NoShow'
  | 'Cancelled';

export interface Appointment {
  id: number;
  ticketCode?: string;
  queueToken?: string;
  roomNumber?: string;
  patientId?: number | string;
  patientName?: string;
  doctorId?: string | number;
  doctorName: string;
  serviceId?: number | string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime?: string;
  mode: string;
  status: AppointmentStatus | string;
  paymentMethod?: string;
  meetingLink?: string;
  notes?: string;
  price: number;
  createdByRole?: string;
  createdAt?: string;
  payment?: Payment;
  visit?: Visit | null;
}
