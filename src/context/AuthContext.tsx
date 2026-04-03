"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { trackUserActivity, setUserOffline } from "@/app/admin/actions";

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
      setCredits(0);
    }
  }, []);

  // Tracking user activity
  useEffect(() => {
    if (isLoggedIn && username) {
      const heartbeat = setInterval(() => {
        trackUserActivity(username); 
      }, 30000); // every 30s
      
      return () => clearInterval(heartbeat);
    }
  }, [isLoggedIn, username]);

  const login = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
    trackUserActivity(user);
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
    if (username) setUserOffline(username);
    setIsLoggedIn(false);
    setUsername(null);
    localStorage.removeItem("infinitygz_auth");
    localStorage.removeItem("infinitygz_user");
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
