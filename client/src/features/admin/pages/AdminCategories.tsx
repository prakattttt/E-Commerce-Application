import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { fadeUp } from "../../../animations";
import { getCategories } from "../api/admin.api";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import type { ICategoryPlus } from "../types/categories.types";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";

const AdminCategories = () => {
  const [categories, setCategories] = useState<ICategoryPlus[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        const response = await getCategories();
        setCategories(response.categories);
      } catch (error) {
        getErrorMessage(error);
      }
    };

    run();
  }, []);

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <PageHeader
        title="Categories"
        description="Organize your products into different categories."
        action={
          <Link
            to="/admin/categories/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Plus size={18} />
            Add Category
          </Link>
        }
      />

      <SearchBar placeholder="Search category..." className="max-w-md" />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category, index) => (
          <CategoryCard key={category._id} category={category} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default AdminCategories;
