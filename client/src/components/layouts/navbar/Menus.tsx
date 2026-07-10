import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import useNav from "../../../hooks/useNav";
import { menus, moreMenus } from "./menus.data";
import { useState } from "react";

{
  /*Menu Items*/
}

const Menus = () => {
  const { isTransparent } = useNav();

  const [moreOpen, setMoreOpen] = useState(false);
  return (
    <ul className="hidden text-sm items-center gap-4 font-medium md:flex">
      {/*Mapping of Menu Items*/}
      {menus.map((menu) => (
        <li key={menu.name}>
          {/*NavLink to track active nav state*/}
          <NavLink
            to={menu.path}
            className={({ isActive }) =>
              `transition-colors duration-200 ${
                isActive
                  ? isTransparent
                    ? "text-white"
                    : "text-primary"
                  : isTransparent
                    ? "text-white/70 hover:text-white"
                    : "text-foreground hover:text-primary"
              }`
            }
          >
            {menu.name}
          </NavLink>
        </li>
      ))}
      {/* Create a seperate List for more menus */}
      <li
        className="relative"
        onMouseEnter={() => setMoreOpen(true)}
        onMouseLeave={() => setMoreOpen(false)}
      >
        <button
          className={`flex items-center transition-colors duration-200 ${
            isTransparent
              ? "text-white/80 hover:text-white"
              : "text-foreground hover:text-primary"
          }`}
        >
          More
          <ChevronDown
            size={16}
            className={`ml-1 transition-transform duration-200 ${
              moreOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`absolute left-0 top-full mt-2 w-72 rounded-xl border border-border bg-background shadow-xl transition-all duration-200 ${
            moreOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="p-2">
            {moreMenus.map((menu) => (
              <NavLink
                key={menu.name}
                to={menu.path}
                onClick={() => setMoreOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 transition-colors ${
                    isActive ? "bg-primary/10" : "hover:bg-muted"
                  }`
                }
              >
                <p className="text-sm font-semibold">{menu.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {menu.description}
                </p>
              </NavLink>
            ))}
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Menus;
