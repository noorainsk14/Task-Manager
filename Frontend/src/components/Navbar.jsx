import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/user.api";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const nav = useNavigate();

  const doLogout = async () => {
    await logoutUser();
    setUser(null);
    nav("/login");
  };

  return (
    <div className="w-full sticky top-0 z-50 bg-[#393E46] p-4 glass flex items-center justify-between">
      <div
        className=" flex m-2 text-lg font-bold cursor-pointer text-white hover:text-primary-300"
        onClick={() => nav("/")}
      >
        <img src="/logo.png" alt="" className="h-8 w8 mr-2" />
        Task<span className="text-primary-300">Manager</span>
      </div>

      <nav className="flex-1 flex justify-center gap-4">
        {user && (
          <>
            <Link
              className="font-semibold text-white hover:text-gray-300"
              to="/tasks/my"
            >
              My Tasks
            </Link>

            {user?.role === "admin" && (
              <Link
                className="font-semibold text-white hover:text-gray-300"
                to="/admin/dashboard"
              >
                Dashboard
              </Link>
            )}
          </>
        )}
      </nav>

      <div className="flex items-center gap-3">
        {!user && (
          <>
            <Link to="/login">
              <Button variant="secondary" size="lg">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Register
              </Button>
            </Link>
          </>
        )}

        {user && (
          <>
            <div className="text-sm text-white/80 hidden sm:block">
              {user.username} • {user.role}
            </div>
            <Button variant="secondary" size="lg" onClick={doLogout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
