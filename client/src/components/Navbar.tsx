import { Heart, ShoppingCart, User, Search } from "lucide-react";
import Menus from "./nav/Menus";

const Navbar = () => {
  return (
    <nav className="w-full border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-around px-6 py-3">
        {/* Left */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div className="logo">
            <h1 className="font-display cursor-pointer text-xl font-bold tracking-tight">
              <span className="text-primary">Shop</span>
              <span className="text-accent">Sphere</span>
            </h1>
          </div>

          {/* Navigation */}
          <Menus />
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden w-72 md:block">
            <div className="absolute top-1/2 right-0 -translate-y-1/2">
              <Search
                size={16}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
              />

              <input
                type="search"
                placeholder="Search products..."
                className="h-9 w-44 rounded-full border border-border bg-card py-1.5 pr-4 pl-9 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 ease-in-out focus:w-72 focus:border-secondary-foreground focus:shadow-md focus:outline-none"
              />
            </div>
          </div>

          {/* Wishlist */}
          <button className="rounded-full bg-card p-1.5 transition-colors hover:bg-secondary">
            <Heart size={20} />
          </button>

          {/* Cart */}
          <button className="relative rounded-full bg-card p-1.5 transition-colors hover:bg-secondary">
            <ShoppingCart size={20} />

            <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
              2
            </span>
          </button>

          {/* Sign In */}
          <button className="flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <User size={16} />
            <span>Sign In</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
