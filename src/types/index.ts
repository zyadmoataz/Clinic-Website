// Shared TypeScript interfaces mapping to backend DTOs

export interface UserDto {
  id: string;
  email: string;
  displayName: string;
  role: 'patient' | 'doctor' | 'admin' | 'receptionist';
}

export interface DoctorDto {
  id: string;
  displayName: string;
  specialization: string;
  photoUrl?: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  services: ServiceDto[];
}

export interface ServiceDto {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
}

export interface AppointmentDto {
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
