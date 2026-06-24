import { apiClient } from '../api/apiClient';

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

export const getPrescriptions = async (): Promise<MedicalVisit[]> => {
  const response = await apiClient.get<MedicalVisit[]>('/api/me/prescriptions');
  return response.data;
};
