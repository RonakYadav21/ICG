import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decodedValue = jwtDecode(token);
        if (decodedValue.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(decodedValue);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);

    const decoded = jwtDecode(jwtToken);
    localStorage.setItem("user", JSON.stringify(decoded));

    setToken(jwtToken);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
  };
  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
