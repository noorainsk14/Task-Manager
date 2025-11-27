import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateTaskApi, getAllTasksApi } from "../../api/task.api";
import Navbar from "@/components/Navbar";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getAllTasksApi(); // fetch all tasks
        const task = res.data.data.find((t) => t._id === id);
        if (!task) throw new Error("Task not found");

        setForm({
          title: task.title,
          description: task.description || "",
          dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
          priority: task.priority || "medium",
        });
      } catch (err) {
        toast.error(err.message || "Failed to load task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTaskApi(id, form);
      toast.success("Task updated successfully!");
      navigate("/admin/tasks");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-[#222831]">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-lg p-6 shadow-2xl rounded-2xl bg-[#3B4252] border border-gray-600 text-white">
          <CardHeader>
            <CardTitle>Update Task</CardTitle>
            <CardDescription className="text-gray-300">
              Update the task details below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-white">
                  Title
                </Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="bg-[#2E3440] border-gray-600 text-white"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="bg-[#2E3440] border border-gray-600 text-white w-full px-3 py-2 rounded-lg min-h-[100px]"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="dueDate" className="text-white">
                  Due Date
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm({ ...form, dueDate: e.target.value })
                  }
                  className="bg-[#2E3440] border-gray-600 text-white"
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-white">Priority</Label>
                <Select
                  value={form.priority}
                  onValueChange={(value) =>
                    setForm({ ...form, priority: value })
                  }
                >
                  <SelectTrigger className="w-full mt-2 border border-gray-600 bg-[#2E3440] text-white">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <CardFooter className="flex flex-col gap-2 p-0 mt-4">
                <Button type="submit" className="w-full">
                  Update Task
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full text-black"
                  onClick={() => navigate("/admin/tasks")}
                >
                  Cancel
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
