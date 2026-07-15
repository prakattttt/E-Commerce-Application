import { Bell, Menu, Search } from "lucide-react";

interface Props {
  onMenuClick: () => void;
}

const AdminTopbar = ({ onMenuClick }: Props) => {
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
        <div className="hidden items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 md:flex">
          <Search size={18} />

          <input
            placeholder="Search..."
            className="bg-transparent outline-none"
          />
        </div>
        {/* Notifications */}
        <button className="rounded-xl border border-border bg-card p-3">
          <Bell size={18} />
        </button>

        {/* Avatar */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary font-semibold text-primary-foreground">
          A
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
