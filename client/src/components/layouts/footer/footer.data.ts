import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const footerSections = [
  {
    title: "Explore",
    links: [
      { name: "Home", path: "/" },
      { name: "Shop", path: "/shop" },
      { name: "About Us", path: "/about" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "My Profile", path: "/profile" },
      { name: "FAQ", path: "/faq" },
      { name: "Contact Us", path: "/contact" },
    ],
  },
];

export const socialLinks = [
  {
    icon: FaXTwitter,
    href: "#",
  },
  {
    icon: FaFacebook,
    href: "#",
  },
  {
    icon: FaInstagram,
    href: "#",
  },
  {
    icon: FaGithub,
    href: "#",
  },
];
