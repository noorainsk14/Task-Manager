import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col h-screen bg-[#37353E]">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 p-6">
        <Link
          to="/admin/create-task"
          className="w-60 h-40 bg-white/10 text-white backdrop-blur
                     flex items-center justify-center
                     rounded-xl border border-white/20
                     hover:bg-white/20 transition duration-200 text-xl font-medium"
        >
          Create Task
        </Link>

        <Link
          to="/admin/tasks"
          className="w-60 h-40 bg-white/10 text-white backdrop-blur
                     flex items-center justify-center
                     rounded-xl border border-white/20
                     hover:bg-white/20 transition duration-200 text-xl font-medium"
        >
          View All Tasks
        </Link>
      </div>
    </div>
  );
}
