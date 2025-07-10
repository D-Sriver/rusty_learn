import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Erreur inconnue");
          set({ user: data.user, loading: false, error: null });
        } catch (e: any) {
          set({ error: e.message, loading: false });
        }
      },
      register: async (email, password, username) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, username }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Erreur inconnue");
          set({ user: { id: data.user?.id ?? 0, email, username }, loading: false, error: null });
        } catch (e: any) {
          set({ error: e.message, loading: false });
        }
      },
      logout: () => set({ user: null }),
    }),
    { name: "auth-store" }
  )
); 