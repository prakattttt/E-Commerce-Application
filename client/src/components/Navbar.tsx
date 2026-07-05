import { Heart, ShoppingCart, User } from "lucide-react";
import Menus from "./nav/Menus";
import NavSearch from "./nav/NavSearch";

const Navbar = () => {
  return (
    <nav className="w-full border-b border-border bg-card animate-navbar">
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
          <NavSearch />

          {/* Wishlist */}
          <button className="rounded-full bg-card p-2 transition-colors hover:bg-secondary">
            <Heart size={20} />
          </button>

          {/* Cart */}
          <button className="relative rounded-full bg-card p-2 transition-colors hover:bg-secondary">
            <ShoppingCart size={20} />

            <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
              2
            </span>
          </button>

          {/* Sign In */}
          <button className="flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary-foreground">
            <User size={16} />
            <span>Sign In</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
