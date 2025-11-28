import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function TaskCard({ task, onStatusChange, onDelete, onEdit }) {
  const { user } = useAuth();

  return (
    <div className="bg-[#2E3136] p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-white">{task.title}</h3>
          <p className="text-sm text-white/80 mt-1">
            {task.description || "No description"}
          </p>
          <div className="text-xs text-white/60 mt-2">
            Assigned to:{" "}
            {task.assignedTo?.username || user.username || "Unassigned"}
          </div>
          <div className="text-xs text-white/60 mt-1">
            Priority: <span className="font-medium">{task.priority}</span>
          </div>
          {task.dueDate && (
            <div className="text-xs text-white/60 mt-1">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>

        <div className="text-right flex flex-col gap-2">
          <div className="text-sm text-white/80">
            Status:{" "}
            <span className="font-medium capitalize">{task.status}</span>
          </div>

          <select
            className="bg-[#3A3F47] text-white text-sm rounded-md p-1 focus:outline-none"
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
          </select>

          {user?.role === "admin" && (
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" onClick={onEdit}>
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(task._id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
