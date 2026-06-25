import { useQuery } from '@tanstack/react-query';
import { getPrescriptions } from '../resources/prescriptions.api';
import type { MedicalVisit } from '@/types';

export const usePrescriptions = () => {
  return useQuery<MedicalVisit[]>({
    queryKey: ['myPrescriptions'],
    queryFn: getPrescriptions
  });
};
