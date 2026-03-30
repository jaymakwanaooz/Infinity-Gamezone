"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (user: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("infinitygz_auth");
    const storedUser = localStorage.getItem("infinitygz_user");
    if (storedAuth === "true") {
      setIsLoggedIn(true);
      setUsername(storedUser || "USER");
    }
  }, []);

  const login = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem("infinitygz_auth", "true");
    localStorage.setItem("infinitygz_user", user);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    localStorage.removeItem("infinitygz_auth");
    localStorage.removeItem("infinitygz_user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
