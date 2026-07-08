import { motion } from "framer-motion";
import { Bolt } from "lucide-react";
import DiscountCard from "../../components/common/DiscountCard";
import { flashSaleProducts } from "../../components/dummy/dummy";
import { fadeUp } from "../../animations/index";

const FlashSale = () => {
  return (
    <section className="mx-auto max-w-7xl overflow-hidden rounded-3xl px-6">
      <div className="rounded-3xl bg-[linear-gradient(135deg,#1e1b4b_0%,#312e81_50%,#4c1d95_100%)] p-8 text-primary-foreground md:p-12">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
              <Bolt size={16} />
              Flash Sale
            </div>

            <h2 className="font-display text-4xl font-bold">
              Today's Best Deals
            </h2>

            <p className="mt-2 text-primary-foreground/70">
              Limited time offers on selected products.
            </p>
          </div>

          {/* Dummy Timer */}
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-medium text-muted mb-5">Ends In:</h1>

            <div className="flex items-center gap-3">
              {["12", "45", "32"].map((time, i) => (
                <div key={i} className="text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-card/10 text-xl font-bold backdrop-blur">
                    {time}
                  </div>

                  <p className="mt-2 text-xs uppercase text-primary-foreground/70">
                    {["HRS", "MIN", "SEC"][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {flashSaleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <DiscountCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
