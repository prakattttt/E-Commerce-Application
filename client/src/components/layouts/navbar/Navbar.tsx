import { useState } from "react";
import { Heart, ShoppingCart, User, Menu, X } from "lucide-react";

import Menus from "./Menus";
import NavSearch from "./NavSearch";
import MobileMenu from "./MobileMenu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="h-14 w-full border-b border-border bg-card animate-navbar">
        <div className="mx-auto flex max-w-7xl items-center justify-between md:justify-around px-2 py-3">
          {/* Left */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div>
              <h1 className="font-display cursor-pointer text-xl font-bold tracking-tight">
                <span className="text-primary">Shop</span>
                <span className="text-accent">Sphere</span>
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <Menus />
            </div>
          </div>

          {/* Right (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <NavSearch />

            <button className="rounded-full bg-card p-1.5 hover:bg-secondary transition-colors">
              <Heart size={20} />
            </button>

            <button className="relative rounded-full bg-card p-1.5 hover:bg-secondary transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                2
              </span>
            </button>

            <Link to={"/auth"} className="ml-1 flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-secondary-foreground transition-colors">
              <User size={16} />
              <span>Sign In</span>
            </Link>
          </div>

          {/* Mobile Right */}
          <div className="flex md:hidden items-center gap-2">
            <button className="rounded-full bg-card p-1.5 hover:bg-secondary transition">
              <Heart size={20} />
            </button>

            <button className="relative rounded-full bg-card p-1.5 hover:bg-secondary transition">
              <ShoppingCart size={20} />
              <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                2
              </span>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="rounded-full bg-card p-2 hover:bg-secondary transition"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu open={open} />
    </>
  );
};

export default Navbar;
