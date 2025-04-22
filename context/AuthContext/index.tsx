// context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "expo-router";
import { AuthContextType, DecodedToken } from "@/Interface/auth";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); //for login fields
  const [error2, setError2] = useState<string | null>(null); //for register fields
  const api = useAxios();
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          setUser(decoded);
        } catch (err) {
          console.error("Token decode error", err);
          setError("Failed to decode token");
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/token/", { email, password });
      if (response.status === 200) {
        await AsyncStorage.setItem("access_token", response.data.access);
        await AsyncStorage.setItem("refresh_token", response.data.refresh);
        const decoded = jwtDecode<DecodedToken>(response.data.access);
        setUser(decoded);
        setError(null);
      } else {
        const errorMessage = response.data?.detail;
        console.log("Backend error:", errorMessage);
        setError(errorMessage);
      }
    } catch (err: any) {
      console.log("Login error:", err.message, err.code);
      setError(
        "Cannot connect to the server. Please check your network connection."
      );
    }
  };

  const register = async (
    email: string,
    username: string,
    password: string,
    password2: string
  ): Promise<boolean> => {
    try {
      const response = await api.post("/register/", {
        email: email,
        username: username,
        password: password,
        password2: password2,
      });

      if (response.status === 200 || response.status === 201) {
        setError2(null);
        return true;
      } else {
        setError2(response.data);
        console.log(error);
        return false;
      }
    } catch (err: any) {
      setError2(err);
      console.log(err);
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
    setUser(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        error,
        error2,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
