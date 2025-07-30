import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null); // NEW

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedRole = sessionStorage.getItem("role");
    const storedUser = sessionStorage.getItem("user"); // NEW

    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);
    if (storedUser) setUser(JSON.parse(storedUser)); // NEW
  }, []);

  const login = (newToken, newRole, newUser) => {
    setToken(newToken);
    setRole(newRole);
    setUser(newUser); // NEW
    sessionStorage.setItem("token", newToken);
    sessionStorage.setItem("role", newRole);
    sessionStorage.setItem("user", JSON.stringify(newUser)); // NEW
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null); // NEW
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("user"); // NEW
  };

  return (
    <AuthContext.Provider value={{ token, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
