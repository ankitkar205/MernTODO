import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("todoMern_user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("todoMern_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("todoMern_user");
    }
  }, [user]);

  const login = ({ user, token }) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    // 🔥 CLEAR EVERYTHING
    localStorage.removeItem("token");
    localStorage.removeItem("todoMern_user");
    setToken(null);
    setUser(null);
    // Optional: Force a hard reload to clear any lingering React states
    // window.location.href = "/login"; 
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: Boolean(token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}