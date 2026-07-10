import { ArrowRight, Bolt } from "lucide-react";
import heroImage from "../../../assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section
      className="
        relative overflow-hidden pt-14
        bg-[linear-gradient(135deg,#1e1b4b_0%,var(--primary)_40%,#7c3aed_70%,#a855f7_100%)]
        text-primary-foreground
      "
    >
      {/* Blur into next section */}
      <div className="absolute bottom-0 left-0 h-10 w-full bg-linear-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center gap-20 px-6 pt-14 pb-24 lg:flex-row">
        {/* Left */}
        <div className="animate-slide-left flex-1">
          {/* Badge */}
          <div className="animate-pop inline-flex items-center gap-2 font-semibold rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 backdrop-blur">
            <Bolt size={16} className="text-gold" />

            <span className="text-sm font-medium text-gold">
              New Season — Up to 60% Off
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-8 max-w-2xl font-display text-5xl font-bold leading-tight lg:text-7xl">
            Shop the{" "}
            <span className="bg-[linear-gradient(90deg,#fbbf24,#f472b6)] bg-clip-text text-transparent">
              Future
            </span>
            <br />
            of Commerce
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/75">
            Discover premium products curated for the modern lifestyle. Fast
            shipping, easy returns, and world-class quality.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-xl bg-card px-8 py-3 font-semibold text-primary transition duration-300 hover:scale-105">
              Shop Now
              <ArrowRight size={18} />
            </button>

            <button className="rounded-xl border border-primary-foreground/20 bg-primary-foregorund/5 px-8 py-3 font-semibold text-primary-foreground backdrop-blur transition hover:bg-primary-foreground/5">
              Explore Deals
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 flex gap-12">
            <div>
              <h3 className="font-display text-3xl font-bold">50K+</h3>
              <p className="mt-1 text-primary-foreground/70">Products</p>
            </div>

            <div>
              <h3 className="font-display text-3xl font-bold">2M+</h3>
              <p className="mt-1 text-primary-foreground/70">Customers</p>
            </div>

            <div>
              <h3 className="font-display text-3xl font-bold">99%</h3>
              <p className="mt-1 text-primary-foreground/70">Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="animate-slide-right relative hidden flex-1 justify-center lg:flex">
          {/* Glow */}
          <div className="absolute h-112.5 w-112.5 rounded-full bg-card/10 blur-[120px]" />

          <img
            src={heroImage}
            alt="Hero"
            className="relative z-10 w-full max-w-lg rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
