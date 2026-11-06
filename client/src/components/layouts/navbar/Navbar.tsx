import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";

import Menus from "./Menus";
import NavSearch from "./NavSearch";
import MobileMenu from "./MobileMenu";
import AuthButton from "./AuthButton";
import useAuth from "../../../features/auth/hooks/useAuth";
import useNav from "../../../hooks/useNav";
import ShoppingCart from "./ShoppingCart";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  const { isTransparent } = useNav();
  const [open, setOpen] = useState(false);

  const buttonCondition = isTransparent ? "text-card" : "text-foreground";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration- h-15 ${
          isTransparent ? "bg-transparent" : "bg-background/90 backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6 lg:justify-around">
          {/* Left */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Logo */}
            <div>
              <h1 className="font-display cursor-pointer text-xl font-bold tracking-tight">
                <span className="text-primary">Shop</span>
                <span className="text-accent">Sphere</span>
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:block">
              <Menus />
            </div>
          </div>

          {/* Right (Desktop) */}
          <div className="hidden lg:flex items-center gap-2">
            <NavSearch />

            <button
              className={`rounded-full p-1.5 transition-colors ${
                isTransparent
                  ? "backdrop-blur-md hover:bg-white/20"
                  : "hover:bg-secondary"
              }`}
            >
              <Heart size={20} className={buttonCondition} />
            </button>

            <ShoppingCart isTransparent={isTransparent} />

            <AuthButton isAuthenticated={isAuthenticated} logout={logout} />
          </div>

          {/* Mobile Right */}
          <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
            <button
              aria-label="View wishlist"
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

            <ShoppingCart isTransparent={isTransparent} />

            {/* Hamburger */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
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
      <MobileMenu open={open} closeMenu={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
