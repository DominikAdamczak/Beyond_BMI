import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Appointment types
export interface Appointment {
  id: number;
  date: string;
  time: string;
  available: boolean;
}

export interface BookingData {
  name: string;
  email: string;
  slotId: number;
}

export interface BookingResponse {
  bookingId: string;
}

export interface PaymentData {
  bookingId: number;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
}

// API functions
export const getAppointments = async (): Promise<Appointment[]> => {
  const response = await api.get<Appointment[]>('/appointments');
  return response.data;
};

export const bookAppointment = async (data: BookingData): Promise<BookingResponse> => {
  const response = await api.post<BookingResponse>('/book', data);
  return response.data;
};

export const payBooking = async (data: PaymentData): Promise<PaymentResponse> => {
  const response = await api.post<PaymentResponse>('/pay', data);
  return response.data;
};

export default api;
