import { socialLinks } from "./footer.data";

const FooterBrand = () => {
  return (
    <div>
      {/*Brand info*/}
      <h2 className="font-display text-3xl font-bold tracking-tight">
        Shop<span className="text-accent">Sphere</span>
      </h2>

      <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
        Premium shopping experience for the modern world. Quality products, fast
        delivery, and exceptional customer service.
      </p>

      {/*Map each of the social links*/}
      <div className="mt-8 flex items-center gap-3">
        {socialLinks.map(({ icon: Icon, href }, index) => (
          <a
            key={index}
            href={href}
            className="rounded-full bg-white/10 p-2.5 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:text-white"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterBrand;
