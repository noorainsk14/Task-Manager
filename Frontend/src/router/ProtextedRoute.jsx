import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  // Show loading UI until auth state is ready
  if (loading) return <p>Loading...</p>;

  // If user not logged in → redirect
  if (!user) return <Navigate to="/login" replace />;

  // If role is required and user role doesn't match → redirect
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
}
