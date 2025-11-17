"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/lib/types";
import { DEMO_USERS, DEMO_PASSWORD } from "@/lib/mock-data";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAdmin: boolean;
  isTeacher: boolean;
  isParent: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("eduflow-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("eduflow-user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Demo login logic
    const demoUser = DEMO_USERS.find((u) => u.email === email);
    
    if (demoUser && password === DEMO_PASSWORD) {
      setUser(demoUser);
      localStorage.setItem("eduflow-user", JSON.stringify(demoUser));
      return;
    }

    // For non-demo accounts, simulate a simple check
    // In production, this would be an API call
    if (email && password) {
      throw new Error("Invalid credentials. Use demo accounts or try: admin@demo.com / demo123");
    }

    throw new Error("Please provide email and password");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eduflow-user");
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAdmin: user?.role === "admin",
    isTeacher: user?.role === "teacher",
    isParent: user?.role === "parent",
    isStudent: user?.role === "student",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
