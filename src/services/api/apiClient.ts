import axios from 'axios';
import type { MedicalVisit } from '../../types';

// Base API URL from your Swagger documentation
const BASE_URL = 'https://api.clinic.kaessam.codes';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to automatically add token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling global errors (like 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., redirect to login or clear token)
      console.error('Unauthorized access - perhaps redirect to login');
      localStorage.removeItem('auth_token');
    }
    return Promise.reject(error);
  }
);
export const getPrescriptions = async (): Promise<MedicalVisit[]> => {
  const response = await apiClient.get<MedicalVisit[]>('/api/me/prescriptions');
  return response.data;
};
