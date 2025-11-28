import { createContext, useContext, useEffect, useState } from "react";
import { getAllUsers } from "../api/user.api";
import { useAuth } from "../hooks/useAuth";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    // Only fetch if user exists and is admin
    if (!user || user.role !== "admin") {
      setUsers([]);
      setLoadingUsers(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users:", err);
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <UsersContext.Provider value={{ users, loadingUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
