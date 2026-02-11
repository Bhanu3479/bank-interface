import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ======================================
  // Load user from localStorage on refresh
  // ======================================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ======================================
  // Login Function
  // ======================================
  const login = (data) => {
    // data = { token, user }
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  // ======================================
  // Logout Function
  // ======================================
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
