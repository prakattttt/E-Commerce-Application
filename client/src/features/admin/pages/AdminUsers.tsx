import { motion } from "framer-motion";
import { Search, Shield, Trash2, Mail, Calendar, User } from "lucide-react";

import { fadeUp } from "../../../animations";

const users = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    joined: "12 Jan 2026",
  },
  {
    _id: "2",
    name: "Admin",
    email: "admin@shopsphere.com",
    role: "Admin",
    joined: "02 Jan 2026",
  },
  {
    _id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    joined: "18 Feb 2026",
  },
  {
    _id: "4",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "User",
    joined: "27 Mar 2026",
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
      {/* ================= Header ================= */}
      <div>
        <h1 className="font-display text-3xl font-bold">Users</h1>

        <p className="mt-2 text-muted-foreground">
          Manage all registered ShopSphere users.
        </p>
      </div>

      {/* ================= Search ================= */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="text"
          placeholder="Search users..."
          className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 outline-none transition focus:border-primary"
        />
      </div>

      {/* ================= User Cards ================= */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {users.map((user, index) => (
          <motion.div
            key={user._id}
            variants={fadeUp}
            custom={index}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Avatar */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
              <User size={30} />
            </div>

            {/* Name */}
            <h2 className="mt-5 font-display text-xl font-bold">{user.name}</h2>

            {/* Email */}
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Mail size={16} />
              {user.email}
            </div>

            {/* Joined */}
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={16} />
              {user.joined}
            </div>

            {/* Role */}
            <div className="mt-6">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                  user.role === "Admin"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}
              >
                <Shield size={15} />
                {user.role}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button className="flex-1 rounded-xl border border-border py-3 transition hover:bg-secondary">
                Change Role
              </button>

              <button className="flex items-center justify-center rounded-xl bg-error/10 px-5 text-error transition hover:bg-error/20">
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default AdminUsers;
