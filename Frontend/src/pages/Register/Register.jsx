import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/user.api";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form);
      navigate("/login");
      toast.success("User register successfull!");
    } catch (err) {
      setLoading(false);
      console.log(err);

      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#313647]">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl bg-[#3B4252] border border-gray-600 text-white">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription className="text-gray-300">
              Fill the form below to register
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={submit} className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-white">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Your name"
                  value={form.username}
                  className="bg-[#2E3440] border-gray-600 text-white"
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={form.email}
                  className="bg-[#2E3440] border-gray-600 text-white"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  className="bg-[#2E3440] border-gray-600 text-white"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-white">Role</Label>
                <RadioGroup
                  value={form.role}
                  onValueChange={(value) => setForm({ ...form, role: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="role-user" />
                    <Label htmlFor="role-user" className="text-white">
                      User
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="role-admin" />
                    <Label htmlFor="role-admin" className="text-white">
                      Admin
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <CardFooter className="flex-col gap-2 p-0 mt-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating..." : "Create Account"}
                </Button>

                <Button
                  className="text-white"
                  variant="link"
                  onClick={() => navigate("/login")}
                >
                  Already have an account? Login
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
