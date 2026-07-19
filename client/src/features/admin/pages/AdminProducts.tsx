import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { fadeUp } from "../../../animations";
import { getProducts } from "../api/admin.api";
import type { IProduct } from "../../shop/types/products.types";
import type { ICategory } from "../../shop/types/categories.types";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { getCategories } from "../../shop/api/categories.api";
import PageHeader from "../components/PageHeader";
import ProductFilterBar from "../components/ProductFilterBar";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";

const AdminProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();

        setCategories([
          { _id: "all", name: "All", slug: "all" },
          ...data.categories,
        ]);
      } catch (error) {
        getErrorMessage(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts(
          selectedCategory === "all" ? {} : { category: selectedCategory },
        );

        setProducts(data.products);
      } catch (error) {
        getErrorMessage(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase()) ||
      product.category.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <PageHeader
        title="Products"
        description="Manage every product available in ShopSphere."
        action={
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Plus size={18} />
            Add Product
          </Link>
        }
      />

      <ProductFilterBar
        search={search}
        onSearchChange={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {loading && (
        <div className="py-16 text-center text-muted-foreground">
          Loading products...
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <EmptyState
          title="No Products Found"
          message="Try searching for another product."
        />
      )}

      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default AdminProducts;
