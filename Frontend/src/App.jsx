import { useEffect, useState } from "react";
import AppRouter from "./router/AppRouter";
import { useAuth } from "./hooks/useAuth";
import { getCurrentUser, getAllUsers } from "./api/user.api";
import { UsersProvider } from "./context/UsersContext.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  // const { user, setUser } = useAuth();
  // const [users, setUsers] = useState([]);
  // const [loadingUsers, setLoadingUsers] = useState(true);

  // // 1️⃣ Load current user only if not already set
  // useEffect(() => {
  //   if (!user) {
  //     const fetchUser = async () => {
  //       try {
  //         const res = await getCurrentUser();
  //         setUser(res.data.data);
  //       } catch (err) {
  //         setUser(null); // not logged in
  //       }
  //     };
  //     fetchUser();
  //   }
  // }, [user, setUser]);

  // // 2️⃣ Load all users only if user is admin
  // useEffect(() => {
  //   if (user && user.role === "admin") {
  //     const fetchUsers = async () => {
  //       try {
  //         const res = await getAllUsers();
  //         setUsers(res);
  //       } catch (err) {
  //         console.error("Failed to fetch users", err);
  //         setUsers([]);
  //       } finally {
  //         setLoadingUsers(false);
  //       }
  //     };
  //     fetchUsers();
  //   } else {
  //     setUsers([]);
  //     setLoadingUsers(false);
  //   }
  // }, [user]);

  return (
    // <UsersProvider value={{ users, loadingUsers }}>
    <div className="h-screen w-full">
      <AppRouter />
    </div>
    // </UsersProvider>
  );
}
