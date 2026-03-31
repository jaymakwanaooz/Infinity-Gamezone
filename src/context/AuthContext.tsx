"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  credits: number;
  login: (user: string) => void;
  logout: () => void;
  addCredits: (amount: number) => void;
  deductCredits: (amount: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const storedAuth = localStorage.getItem("infinitygz_auth");
    const storedUser = localStorage.getItem("infinitygz_user");
    const storedCredits = localStorage.getItem("infinitygz_credits");
    
    if (storedAuth === "true") {
      setIsLoggedIn(true);
      setUsername(storedUser || "USER");
    }
    if (storedCredits) {
      setCredits(parseInt(storedCredits, 10));
    } else {
      // Default credits for new/existing users if not set
      setCredits(0);
    }
  }, []);

  const login = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem("infinitygz_auth", "true");
    localStorage.setItem("infinitygz_user", user);
    
    // If no credits stored, give some initial credits for demo
    if (!localStorage.getItem("infinitygz_credits")) {
       const initial = 1450;
       setCredits(initial);
       localStorage.setItem("infinitygz_credits", initial.toString());
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    localStorage.removeItem("infinitygz_auth");
    localStorage.removeItem("infinitygz_user");
    // Keep credits in localStorage or clear them? 
    // Usually credits are tied to account, for demo let's keep them.
  };

  const addCredits = (amount: number) => {
    setCredits((prev) => {
      const neu = prev + amount;
      localStorage.setItem("infinitygz_credits", neu.toString());
      return neu;
    });
  };

  const deductCredits = (amount: number): boolean => {
    let success = false;
    setCredits((prev) => {
      if (prev >= amount) {
        const neu = prev - amount;
        localStorage.setItem("infinitygz_credits", neu.toString());
        success = true;
        return neu;
      }
      return prev;
    });
    return success;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, credits, login, logout, addCredits, deductCredits }}>
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
