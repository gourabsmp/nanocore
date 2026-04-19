import { create } from 'zustand';
import { apiFetch } from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string, address?: string) => Promise<void>;
  logout: () => void;
  initAuth: () => Promise<void>;
  updateProfile: (data: { name?: string; phone?: string; address?: string }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isLoading: true,
  error: null,

  login: async (email, password) => {
    try {
      set({ error: null, isLoading: true });
      const data = await apiFetch<{ token: string; user: User }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('token', data.token);
      set({ token: data.token, user: data.user, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  register: async (name, email, password, phone, address) => {
    try {
      set({ error: null, isLoading: true });
      const data = await apiFetch<{ token: string; user: User }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, phone, address }),
      });
      localStorage.setItem('token', data.token);
      set({ token: data.token, user: data.user, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isLoading: false, error: null });
  },

  initAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isLoading: false });
      return;
    }
    try {
      const data = await apiFetch<{ user: User }>('/api/auth/me');
      set({ user: data.user, token, isLoading: false });
    } catch {
      localStorage.removeItem('token');
      set({ user: null, token: null, isLoading: false });
    }
  },

  updateProfile: async (profileData) => {
    try {
      set({ error: null });
      const data = await apiFetch<{ user: User }>('/api/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      });
      set({ user: data.user, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },
}));
