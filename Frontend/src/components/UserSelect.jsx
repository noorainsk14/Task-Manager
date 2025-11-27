import { useUsers } from "@/context/UsersContext";
import { useState } from "react";

export default function UserSelect({ value, onChange }) {
  const { users, loadingUsers } = useUsers();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  if (loadingUsers) return <p>Loading users...</p>;

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full z-50">
      <div
        className="border text-gray-500 border-gray-500 rounded-lg px-3 py-2 cursor-pointer bg-white"
        onClick={() => setOpen(!open)}
      >
        {value ? users.find((u) => u._id === value)?.username : "Assign To"}
      </div>

      {open && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex items-start justify-center bg-black/30">
          <div className="mt-40 w-full max-w-md bg-white shadow-lg rounded-lg border border-gray-200 p-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search user..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="max-h-40 overflow-y-auto">
              {filteredUsers.length === 0 ? (
                <p className="text-gray-400 text-sm">No users found</p>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => {
                      onChange(user._id);
                      setOpen(false);
                    }}
                  >
                    {user.username}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
