import { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../api/user.api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load logged-in user on page refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser(); // cookie-based JWT
        setUser(res.data.data);
      } catch (err) {
        setUser(null); // not logged in
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
