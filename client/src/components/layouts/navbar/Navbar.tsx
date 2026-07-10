import { useState } from "react";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";

import Menus from "./Menus";
import NavSearch from "./NavSearch";
import MobileMenu from "./MobileMenu";
import AuthButton from "./AuthButton";
import useAuth from "../../../features/auth/hooks/useAuth";
import useNav from "../../../hooks/useNav";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  const { isTransparent } = useNav();
  const [open, setOpen] = useState(false);

  const buttonCondition = isTransparent ? "text-card" : "text-foreground";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration- h-15 ${
          isTransparent
            ? "bg-transparent"
            : "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
        }`}
      >
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

            <button
              className={`rounded-full p-1.5 transition-colors ${
                isTransparent
                  ? "backdrop-blur-md hover:bg-white/20"
                  : "bg-card hover:bg-secondary"
              }`}
            >
              <Heart size={20} className={buttonCondition} />
            </button>

            <button
              className={`rounded-full p-1.5 transition-colors ${
                isTransparent
                  ? "backdrop-blur-md hover:bg-white/20"
                  : "bg-card hover:bg-secondary"
              }`}
            >
              <ShoppingCart
                className={`transition-colors ${buttonCondition}`}
              />
              <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                2
              </span>
            </button>

            <AuthButton isAuthenticated={isAuthenticated} logout={logout} />
          </div>

          {/* Mobile Right */}
          <div className="flex md:hidden items-center gap-2">
            <button
              className={`rounded-full p-1.5 transition-colors ${
                isTransparent
                  ? "backdrop-blur-md hover:bg-white/20"
                  : "hover:bg-secondary"
              }`}
            >
              <Heart
                size={20}
                className={`${isTransparent ? "text-card" : "text-foreground"}`}
              />
            </button>

            <button
              className={`rounded-full p-1.5 transition-colors ${
                isTransparent
                  ? "backdrop-blur-md hover:bg-white/20"
                  : "hover:bg-secondary"
              }`}
            >
              <ShoppingCart
                size={20}
                className={`${isTransparent ? "text-card" : "text-foreground"}`}
              />
              <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                2
              </span>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="rounded-full p-2 transition hover:bg-white/20"
            >
              {open ? (
                <X size={20} className={buttonCondition} />
              ) : (
                <Menu size={20} className={buttonCondition} />
              )}
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
