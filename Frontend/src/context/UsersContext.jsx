import { createContext, useContext, useEffect, useState } from "react";
import { getAllUsers } from "../api/user.api";
import { useAuth } from "../hooks/useAuth"; // <-- import auth

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const { user } = useAuth(); // <-- current logged user
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    if (!user) {
      setUsers([]);
      setLoadingUsers(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to load users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [user]); // re-run when login/logout happens

  return (
    <UsersContext.Provider value={{ users, loadingUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
