import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center bg-[#44444E] justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
}
