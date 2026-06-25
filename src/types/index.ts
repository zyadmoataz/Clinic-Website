export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  displayName: string;
  email: string;
  password: string;
  phone: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'admin' | 'receptionist';
  phone: string;
  avatarUrl: string;
  isActive: boolean;
}

export interface Doctor {
  id: string;
  displayName: string;
  specialization: string;
  photoUrl?: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  serviceId: string;
  serviceName: string;
  date: string;
  startTime: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  paymentStatus: 'Paid' | 'Pending';
  mode: 'online' | 'cash';
}
export interface PrescriptionItem {
  drug: string;
  dosage: string;
  duration: string;
}

export interface MedicalVisit {
  id: number;
  appointmentId: number;
  diagnosis: string;
  notes: string;
  createdAt: string;
  editableUntil: string;
  isEditable: boolean;
  prescription: PrescriptionItem[];
}
