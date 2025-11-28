import { useState } from "react";
import { loginUser, getCurrentUser } from "../../api/user.api";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Login (backend sets JWT cookie)
      await loginUser(form);

      // Step 2: Fetch current user after login
      const res = await getCurrentUser();
      setUser(res.data.data);

      toast.success("Logged in successfully!");
      navigate("/"); // redirect to home or dashboard
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#313647]">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 shadow-2xl rounded-2xl bg-[#3B4252] border border-gray-600">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              Login to your account
            </CardTitle>
            <CardDescription className="text-gray-300">
              Enter your email and password to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-gray-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="bg-[#2E3440] border border-gray-500 text-white"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-gray-200">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-[#2E3440] border border-gray-500 text-white"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <CardFooter className="flex-col gap-2 p-0 mt-4">
                <Button type="submit" className="w-full">
                  Login
                </Button>

                <Button
                  variant="link"
                  className="text-white"
                  onClick={() => navigate("/register")}
                >
                  Create an Account
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
