import { Search } from "lucide-react";

const NavSearch = () => {
  return (
    <div className="relative hidden w-64 md:block">
      <div className="absolute top-1/2 right-0 -translate-y-1/2">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="search"
          placeholder="Search products..."
          className="h-9 w-44 rounded-full border border-border bg-card py-1.5 pr-4 pl-9 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 ease-in-out focus:w-64 focus:outline-none focus:ring-0 focus:border-muted-foreground"
        />
      </div>
    </div>
  );
};

export default NavSearch;
