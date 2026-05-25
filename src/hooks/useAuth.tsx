import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  id: string;
  nome: string;
  email: string;
  role: 'admin' | 'vendedor' | 'tecnico' | 'gerente';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'allcrom_user';

const MOCK_USER: User = {
  id: '1',
  nome: 'Carlos Mendes',
  email: 'carlos@allcrom.com.br',
  role: 'admin',
  avatar: undefined,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);

  const signIn = async (_email: string, _password: string): Promise<void> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const loggedUser: User = {
      ...MOCK_USER,
      email: _email || MOCK_USER.email,
    };
    setUser(loggedUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
    } catch {}
    setIsLoading(false);
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
