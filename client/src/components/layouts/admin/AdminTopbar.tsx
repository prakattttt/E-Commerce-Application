import { Menu, LogOut, ShieldCheck } from "lucide-react";

import useAuth from "../../../features/auth/hooks/useAuth";

interface Props {
  onMenuClick: () => void;
}

const AdminTopbar = ({ onMenuClick }: Props) => {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-xl border border-border p-2 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>

          <p className="text-sm text-muted-foreground">Welcome back, Admin</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          onClick={logout}
          className="group flex items-center gap-3 rounded-2xl border border-border bg-card/5 px-3 py-2 transition-all duration-200 hover:border-primary/30 hover:bg-secondary"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
            <ShieldCheck size={20} />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold leading-none">Admin</p>

            <p className="mt-1 text-xs text-muted-foreground">Sign out</p>
          </div>

          <LogOut
            size={18}
            className="text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary"
          />
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
