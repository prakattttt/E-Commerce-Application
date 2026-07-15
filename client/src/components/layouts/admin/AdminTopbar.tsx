import { Bell, Search } from "lucide-react";

const AdminTopbar = () => {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
      {/* Left */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back, Admin
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 md:flex">
          <Search size={18} className="text-muted-foreground" />

          <input
            type="text"
            placeholder="Search..."
            className="w-56 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Notifications */}
        <button className="relative rounded-2xl border border-border bg-card p-3 transition hover:bg-secondary">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-primary"></span>
        </button>

        {/* Avatar */}
        <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary font-bold text-primary-foreground shadow-md transition hover:scale-105">
          A
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
