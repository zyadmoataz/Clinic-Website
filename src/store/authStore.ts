import { create } from 'zustand';
import { type UserDto } from '../types';

interface AuthState {
  user: UserDto | null;
  isAuthenticated: boolean;
  login: (userData: UserDto, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(() => ({
  user: null,
  isAuthenticated: false,
  login: () => {
    // TODO: Team should implement saving token to localStorage and updating state
    console.log('Login called. Team needs to implement this.');
  },
  logout: () => {
    // TODO: Team should implement removing token from localStorage and updating state
    console.log('Logout called. Team needs to implement this.');
  }
}));
