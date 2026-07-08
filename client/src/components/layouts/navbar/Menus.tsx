import { NavLink } from "react-router-dom";

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
    </ul>
  );
};

export default Menus;
