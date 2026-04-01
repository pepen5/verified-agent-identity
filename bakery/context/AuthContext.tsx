'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type User = {
  name: string;
  email: string;
};

type RegisterInput = User & {
  password: string;
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => { ok: boolean; message?: string };
  register: (input: RegisterInput) => { ok: boolean; message?: string };
  logout: () => void;
};

const USERS_KEY = 'bakery-users';
const SESSION_KEY = 'bakery-auth-user';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(SESSION_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const readUsers = (): RegisterInput[] => {
      try {
        return JSON.parse(window.localStorage.getItem(USERS_KEY) || '[]');
      } catch {
        return [];
      }
    };

    const login = (email: string, password: string) => {
      const users = readUsers();
      const found = users.find((entry) => entry.email === email && entry.password === password);
      if (!found) return { ok: false, message: 'Invalid email or password.' };
      const sessionUser = { name: found.name, email: found.email };
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      setUser(sessionUser);
      return { ok: true };
    };

    const register = (input: RegisterInput) => {
      const users = readUsers();
      if (users.some((entry) => entry.email === input.email)) {
        return { ok: false, message: 'Email is already registered.' };
      }
      users.push(input);
      window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
      const sessionUser = { name: input.name, email: input.email };
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      setUser(sessionUser);
      return { ok: true };
    };

    const logout = () => {
      window.localStorage.removeItem(SESSION_KEY);
      setUser(null);
    };

    return { user, login, register, logout };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
