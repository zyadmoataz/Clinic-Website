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

export interface UpdateProfilePayload {
  displayName: string;
  phone: string;
  avatarUrl?: string;
}

export interface ApiErrorData {
  message?: string;
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

export interface DoctorService {
  id: number;
  name: string;
  durationMinutes: number;
  price: number;
  doctorId: string;
  doctorName: string;
}

export interface DoctorSummary {
  id: string;
  displayName: string;
  specialization: string;
  photoUrl: string | null;
  bio: string | null;
  services: DoctorService[];
  rating: number;
  reviewCount: number;
  yearsExperience: number;
}

export interface DoctorDetail extends DoctorSummary {
  nearestAvailableDates: string[];
}

export interface DoctorsListResponse {
  items: DoctorSummary[];
}

export interface DoctorSlotsResponse {
  date: string;
  slots: string[];
}

export interface DoctorFilters {
  search?: string;
  specialization?: string;
}

export interface ApiErrorData {
  message?: string;
}
