export interface Prescription {
  drug: string;
  dosage: string;
  duration: string;
}

export interface Visit {
  id: number;
  appointmentId: number;
  diagnosis: string;
  notes: string;
  createdAt: string;
  editableUntil: string;
  isEditable: boolean;
  prescription: Prescription[];
}

export interface Payment {
  id: number;
  amount: number;
  method: string;
  status: string;
  transactionRef: string;
  paidAt: string;
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
  services?: Service[];
}

export interface User {
  id: string | number;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'admin' | 'receptionist';
  phone: string;
  avatarUrl?: string;
  isActive?: boolean;
}

export interface Appointment {
  id: number;
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
  status: string;
  paymentMethod?: string;
  meetingLink?: string;
  price: number;
  createdByRole?: string;
  createdAt?: string;
  payment?: Payment;
  visit?: Visit | null;
}
