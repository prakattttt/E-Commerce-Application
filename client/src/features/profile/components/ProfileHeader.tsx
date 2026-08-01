import { ShoppingBag, Heart } from "lucide-react";

import type { User } from "../../auth/types/auth.types";

interface ProfileHeaderProps {
  user: User;
}

const stats = [
  { icon: ShoppingBag, label: "Orders", value: "0" },
  { icon: Heart, label: "Wishlist", value: "0" },
];

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      {/* Identity */}
      <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
        {/* Avatar */}
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-secondary">
          {user.avatar?.url ? (
            <img
              src={user.avatar.url}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-display text-4xl font-bold text-primary">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* User */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <h1 className="font-display text-3xl font-bold">{user.name}</h1>

            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {user.role === "admin" ? "Administrator" : "Customer"}
            </span>
          </div>

          <p className="mt-2 text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-2 divide-x divide-border rounded-2xl bg-secondary/60">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 px-4 py-5"
          >
            <Icon size={20} className="text-primary" />

            <p className="font-display text-2xl font-bold">{value}</p>

            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileHeader;
