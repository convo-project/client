import { createContext, useContext, useEffect, useState } from "react";
import { setAccessToken } from "../services/auth/token";
import { TAuthContext } from "../types/auth";
import instance from "../services/auth/intance";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<TAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const path = window.location.pathname;

    if (accessToken && (path === "/login" || path === "/register" || path === "/")) {
      navigate("/main");
      return;
    }

    if (!accessToken && !(path === "/login" || path === "/register" || path === "/")) {
      alert("서비스 이용을 위해 로그인해 주세요.");
      navigate("/login");
    }
  }, [accessToken, navigate, isLoading]);

  const login = async (email: string, password: string) => {
    const response = await instance.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/user/login`,
      { email, password },
      { withCredentials: true },
    );

    const token = response.headers.authorization;

    if (token) {
      setAccessToken(token);
      setToken(token);
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, isLoading, login }}>{!isLoading && children}</AuthContext.Provider>
  );
};

export const useAuth = (): TAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
