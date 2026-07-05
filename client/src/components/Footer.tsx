import FooterBottom from "./footer/FooterBottom";
import FooterBrand from "./footer/FooterBrand";
import FooterLinks from "./footer/FooterLinks";
import { footerSections } from "./footer/footer.data";

const Footer = () => {
  return (
    <footer className="mt-24 bg-linear-to-r from-indigo-900 via-indigo-700 to-indigo-500 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_3fr]">
          <FooterBrand />

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
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
