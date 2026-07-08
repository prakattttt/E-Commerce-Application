type Props = {
  title: string;
  links: string[];
};

const FooterLinks = ({ title, links }: Props) => {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h3>

      <ul className="mt-5 space-y-3 text-sm text-white/60">
            {/*Map each of the footer links*/}
        {links.map((link) => (
          <li
            key={link}
            className="cursor-pointer transition-colors duration-200 hover:text-white"
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
