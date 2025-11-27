// import { useEffect } from "react";
// import { useTasks } from "../../hooks/useTasks";
// import TaskCard from "../../components/TaskCard";
// import Navbar from "@/components/Navbar";

// export default function MyTasks() {
//   const { tasks, fetchMyTasks, updateStatus, removeTask, loading } = useTasks();

//   useEffect(() => {
//     fetchMyTasks();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="p-6 h-screen bg-[#222831]">
//         <h2 className="text-2xl font-semibold mb-4 text-center text-white">
//           My Tasks
//         </h2>

//         {loading ? (
//           <div>Loading...</div>
//         ) : (
//           <div className="grid gap-4">
//             {tasks.length === 0 && (
//               <div className="card p-4 text-center">No tasks assigned yet.</div>
//             )}

//             {tasks.map((task) => (
//               <TaskCard
//                 key={task._id}
//                 task={{
//                   title: task.title,
//                   description: task.description,
//                   status: task.status,
//                   priority: task.priority,
//                   dueDate: task.dueDate,
//                   assignedTo: task.assignedTo?.username || "Unassigned",
//                 }}
//                 onStatusChange={(id, status) => updateStatus(id, { status })}
//                 onDelete={removeTask}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

import { useEffect } from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskCard from "../../components/TaskCard";
import Navbar from "@/components/Navbar";

export default function MyTasks() {
  const { tasks, fetchMyTasks, updateStatus, removeTask, loading } = useTasks();

  useEffect(() => {
    fetchMyTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 min-h-screen bg-[#222831]">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          My Tasks
        </h2>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid gap-4">
            {tasks.length === 0 && (
              <div className="p-4 text-center text-white">
                No tasks assigned yet.
              </div>
            )}

            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={(id, status) => updateStatus(id, { status })}
                onDelete={removeTask} // user will NOT see delete button anyway
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
