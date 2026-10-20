/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getMyProfile, logoutUser } from '../services/Api';

export interface UserData {
  id_user: number;
  username: string;
  email: string;
  role: "siswa" | "panitia" | "admin";
  id_panitia?: string | null;
}

interface AuthContextType {
  user: UserData | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: UserData) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("auth_token");
      const storedUser = localStorage.getItem("user_data");

      if (storedToken) {
        setToken(storedToken);
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            setUser(null);
          }
        }

        try {
          const profile = await getMyProfile();
          const userData: UserData = {
            id_user: profile.id_user,
            username: profile.username,
            email: profile.email,
            role: profile.role,
            id_panitia: profile.id_panitia,
          };
          setUser(userData);
          localStorage.setItem("user_data", JSON.stringify(userData));
          localStorage.setItem("user_role", profile.role);
        } catch {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("user_role");
          localStorage.removeItem("user_data");
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = (newToken: string, newUser: UserData) => {
    localStorage.setItem("auth_token", newToken);
    localStorage.setItem("user_role", newUser.role);
    localStorage.setItem("user_data", JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // Hapus data lokal meskipun request logout gagal
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_role");
      localStorage.removeItem("user_data");

      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
};

export default AuthContext;