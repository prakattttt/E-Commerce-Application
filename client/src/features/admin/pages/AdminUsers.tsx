import { motion } from "framer-motion";
import { Search, Shield, Trash2, Mail, Calendar, User } from "lucide-react";

import { fadeUp } from "../../../animations";
import { useState, useEffect } from "react";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { getUsers } from "../api/admin.api";
import type { IUser } from "../types/users.types";
import { formatDate } from "../../../utils/formatDate";
import { capitalize } from "../../../utils/capitalize";

const AdminUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    const run = async () => {
      try {
        const response = await getUsers();
        setUsers(response.users);
      } catch (error) {
        getErrorMessage(error);
      }
    };

    run();
  }, []);

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
            {user.avatar?.url ? (
              <img
                src={user.avatar.url}
                alt={user.name}
                className="h-16 w-16 rounded-full object-cover border border-border"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
                <User size={30} />
              </div>
            )}

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
              {formatDate(user.createdAt)}
            </div>

            {/* Role */}
            <div className="mt-6">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                  user.role === "admin"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}
              >
                <Shield size={15} />
                {capitalize(user.role)}
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
