import create from 'zustand';

interface User {
  id: string;
  email: string;
  username?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username?: string) => Promise<void>;
  signOut: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      set({
        user: { id: '1', email },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ error: 'Failed to sign in', isLoading: false });
    }
  },

  signUp: async (email: string, password: string, username?: string) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      set({
        user: { id: '1', email, username },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ error: 'Failed to sign up', isLoading: false });
    }
  },

  signOut: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },
}));
