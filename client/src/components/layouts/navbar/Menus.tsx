import { NavLink } from "react-router-dom";
import { ChevronDownIcon } from "lucide-react";
import useNav from "../../../hooks/useNav";

{
  /*Menu Items*/
}

const menus = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Shop",
    path: "/shop",
  },
  {
    name: "Profile",
    path: "/profile",
  },
];

const Menus = () => {
  const { isTransparent } = useNav();
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
        className={`group flex cursor-pointer items-center transition-all duration-200 ${
          isTransparent
            ? "text-white/80 hover:text-white"
            : "text-foreground hover:text-primary"
        }`}
      >
        More
        <ChevronDownIcon
          size={16}
          className="ml-1 group-hover:rotate-180 transition-all duration-200"
        />
      </li>
    </ul>
  );
};

export default Menus;
