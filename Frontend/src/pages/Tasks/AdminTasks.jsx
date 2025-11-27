import { useEffect } from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskCard from "../../components/TaskCard";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

export default function AdminTasks() {
  const { tasks, fetchAllTasks, updateStatus, removeTask, loading } =
    useTasks();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleEdit = (taskId) => {
    navigate(`/admin/tasks/update/${taskId}`);
  };

  return (
    <>
      <Navbar />
      <div className="p-6 min-h-screen bg-[#222831]">
        <h2 className="text-2xl text-white text-center font-semibold mb-4">
          All Tasks
        </h2>

        {loading ? (
          <div className="text-white text-center">Loading...</div>
        ) : (
          <div className="grid gap-4">
            {tasks.length === 0 && (
              <div className="text-white text-center">No tasks yet.</div>
            )}

            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={(id, status) => updateStatus(id, { status })}
                onDelete={removeTask}
                onEdit={() => handleEdit(task._id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
