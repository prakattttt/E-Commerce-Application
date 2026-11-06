import FooterBottom from "./FooterBottom";
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import { footerSections } from "./footer.data";

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-indigo-900 via-indigo-700 to-indigo-500 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <FooterBrand />

          <div className="grid grid-cols-2 gap-6 sm:gap-10">
            {footerSections.map((section) => (
              <FooterLinks
                key={section.title}
                title={section.title}
                links={section.links}
              />
            ))}
          </div>
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
