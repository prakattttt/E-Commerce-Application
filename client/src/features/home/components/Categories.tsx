import { motion } from "framer-motion";
import { container, item } from "../../../animations";
import { useEffect, useState } from "react";
import type { ICategory } from "../../shop/types/categories.types";
import { getCategories } from "../../shop/api/categories.api";
import { toast } from "sonner";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import Loader from "../../../components/ui/Loader";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await getCategories();
        setCategories(data.categories);
      } catch (error) {
        toast.error(getErrorMessage(error), {
          id: "homepage-fetch-error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl py-24">
        <Loader />
      </section>
    );
  }

  if (categories.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Browse By
          </p>

          <h2 className="mt-2 font-display text-4xl font-bold">
            Shop Categories
          </h2>
        </div>

        <Link
          to="/shop"
          className="flex items-center gap-2 font-semibold text-primary transition hover:translate-x-1"
        >
          View All
          <ArrowRight size={18} />
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6"
      >
        {categories.map((category) => (
          <motion.button
            key={category.name}
            variants={item}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-2xl bg-card shadow-sm hover:shadow-xl"
          >
            <div className="relative aspect-3/4 overflow-hidden">
              <img
                src={category?.image?.url}
                alt={category.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-4 text-left text-primary-foreground">
                <h3 className="mt-1 font-semibold">{category.name}</h3>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};

export default Categories;
