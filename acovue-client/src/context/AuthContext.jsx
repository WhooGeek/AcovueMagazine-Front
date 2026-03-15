import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getMypageContent } from "../api/Mypage.api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearAuth = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setMember(null);
  }, []);

  const refreshMember = useCallback(async () => {
    const response = await getMypageContent();
    const memberData = response.data?.data || response.data;
    setMember(memberData);
    setIsLoggedIn(true);
    return memberData;
  }, []);

  const bootstrapAuth = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLoggedIn(false);
      setMember(null);
      setLoading(false);
      return;
    }

    try {
      await refreshMember();
    } catch (error) {
      console.error("Auth bootstrap failed:", error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  }, [clearAuth, refreshMember]);

  const loginWithTokens = useCallback(async (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
    await refreshMember();
  }, [refreshMember]);

  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  useEffect(() => {
    bootstrapAuth();
  }, [bootstrapAuth]);

  const value = useMemo(() => ({
    isLoggedIn,
    member,
    loading,
    loginWithTokens,
    logout,
    refreshMember,
  }), [isLoggedIn, member, loading, loginWithTokens, logout, refreshMember]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
