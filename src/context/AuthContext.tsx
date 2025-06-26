import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserInterests: (interests: string[]) => void;
  updateUserName: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // For demo purposes, we'll just set a mock user
    // In a real app, this would call an API
    setUser({
      name: 'Demo User',
      email,
      interests: [],
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    // For demo purposes, we'll just set the user
    setUser({
      name,
      email,
      interests: [],
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserInterests = (interests: string[]) => {
    if (user) {
      setUser({ ...user, interests });
    }
  };

  const updateUserName = (name: string) => {
    if (user) {
      setUser({ ...user, name });
    } else {
      setUser({ name, email: '', interests: [] });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUserInterests,
        updateUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};