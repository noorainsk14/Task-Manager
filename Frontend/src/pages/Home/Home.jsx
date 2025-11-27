import Navbar from "@/components/Navbar";
import { useAuth } from "../../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#44444E]">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-[#37353E] glass max-w-4xl w-full p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome{user ? `, ${user.username}` : ""}
          </h1>
          <p className="mt-4 text-white/70 text-lg">
            Task Manager — a sleek admin UI to manage and track your tasks
            efficiently.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2 text-left">
            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <h2 className="font-semibold text-xl text-white">Create Tasks</h2>
              <p className="text-white/70 mt-1">
                Add new tasks, set priorities, assign them to users, and set due
                dates.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <h2 className="font-semibold text-xl text-white">
                Track Progress
              </h2>
              <p className="text-white/70 mt-1">
                View your tasks, update their status, and see progress at a
                glance.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <h2 className="font-semibold text-xl text-white">Manage Users</h2>
              <p className="text-white/70 mt-1">
                Admins can manage users, assign tasks, and monitor overall
                activity.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <h2 className="font-semibold text-xl text-white">
                Stay Organized
              </h2>
              <p className="text-white/70 mt-1">
                Prioritize your work, track deadlines, and keep your tasks
                organized.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
