import { motion } from "framer-motion";
import { Shield, Trash2, Mail, Calendar, User } from "lucide-react";

import { fadeUp } from "../../../animations";
import type { IUser } from "../types/users.types";
import { formatDate } from "../../../utils/formatDate";
import { capitalize } from "../../../utils/capitalize";

interface UserCardProps {
  user: IUser;
  index: number;
}

const UserCard = ({ user, index }: UserCardProps) => {
  return (
    <motion.div
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
  );
};

export default UserCard;
