import { NavLink } from "react-router-dom";
import { ChevronDownIcon } from "lucide-react";

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
                isActive ? "text-primary" : "text-foreground hover:text-primary"
              }`
            }
          >
            {menu.name}
          </NavLink>
        </li>
      ))}
      {/* Create a seperate List for more menus */}
      <li className="group flex cursor-pointer items-center hover:text-primary transition-all duration-200">
        More
        <ChevronDownIcon size={16} className="ml-1 group-hover:rotate-180 transition-all duration-200"/>
      </li>
    </ul>
  );
};

export default Menus;
