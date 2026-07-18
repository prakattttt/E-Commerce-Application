import { Menu, Search } from "lucide-react";

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
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />

          <input
            type="search"
            placeholder="Search products..."
            className="h-11 w-62 rounded-full border border-border bg-card py-2 pr-4 pl-10 text-sm text-foreground transition-all duration-300 focus:w-72 focus:border-primary focus:outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Avatar */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary font-semibold text-primary-foreground">
          A
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
