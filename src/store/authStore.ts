import { create } from 'zustand';
import type { User } from '@/types';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

function readStoredSession(): { user: User | null; token: string | null } {
  if (typeof window === 'undefined') return { user: null, token: null };
  const token = localStorage.getItem(TOKEN_KEY);
  const rawUser = localStorage.getItem(USER_KEY);
  if (!token || !rawUser) return { user: null, token: null };
  try {
    const parsed = JSON.parse(rawUser) as User;
    return { user: parsed, token };
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return { user: null, token: null };
  }
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  updateUser: (userData: User) => void;
  logout: () => void;
}

const initial = readStoredSession();

export const useAuthStore = create<AuthState>((set) => ({
  user: initial.user,
  token: initial.token,
  isAuthenticated: !!(initial.token && initial.user),
  login: (userData, token) => {
    const normalized: User = {
      ...userData,
      name: userData.name || userData.displayName || userData.email
    };
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(normalized));
    set({ user: normalized, token, isAuthenticated: true });
  },
  updateUser: (userData) => {
    const normalized: User = {
      ...userData,
      name: userData.name || userData.displayName || userData.email
    };
    localStorage.setItem(USER_KEY, JSON.stringify(normalized));
    set({ user: normalized });
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    set({ user: null, token: null, isAuthenticated: false });
  }
}));
