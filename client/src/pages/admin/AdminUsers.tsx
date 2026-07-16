import { motion } from "framer-motion";
import { Search, Shield, Trash2 } from "lucide-react";

import { fadeUp } from "../../animations";

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    role: "User",
  },
  {
    name: "Admin",
    email: "admin@shopsphere.com",
    role: "Admin",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
  },
];

const AdminUsers = () => {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div>
        <h1 className="font-display text-3xl font-bold">Users</h1>

        <p className="mt-2 text-muted-foreground">Manage registered users.</p>
      </div>

      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          placeholder="Search users..."
          className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 outline-none transition focus:border-primary"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <table className="min-w-full">
          <thead className="bg-secondary">
            <tr className="text-left text-sm font-semibold">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.email}
                className="border-t border-border hover:bg-secondary/40"
              >
                <td className="px-6 py-4 font-medium">{user.name}</td>

                <td className="px-6 py-4 text-muted-foreground">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm">
                    <Shield size={14} />
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button className="rounded-lg p-2 text-error hover:bg-error/10">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
};

export default AdminUsers;
