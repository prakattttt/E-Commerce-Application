import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { fadeUp } from "../../../animations";
import { getProducts } from "../api/admin.api";
import type { IProduct } from "../../shop/types/products.types";
import type { ICategory } from "../../shop/types/categories.types";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { getCategories } from "../../shop/api/categories.api";

const AdminProducts = () => {
  // Stores all products fetched from the server.
  const [products, setProducts] = useState<IProduct[]>([]);

  // Loading state while fetching products.
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Search text.
  const [search, setSearch] = useState("");

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();

        setCategories([
          {
            _id: "all",
            name: "All",
            slug: "all",
          },
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

  /* Filter products according to search text. */
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
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Products</h1>

          <p className="mt-2 text-muted-foreground">
            Manage every product available in ShopSphere.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            placeholder="Search products..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 outline-none transition focus:border-primary"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-primary"
        >
          {categories.map((category) => (
            <option key={category._id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-16 text-center text-muted-foreground">
          Loading products...
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div className="rounded-2xl border border-border bg-card py-16 text-center">
          <h2 className="text-xl font-semibold">No Products Found</h2>

          <p className="mt-2 text-muted-foreground">
            Try searching for another product.
          </p>
        </div>
      )}

      {/* Product Cards */}
      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              variants={fadeUp}
              custom={index}
              initial="hidden"
              animate="visible"
              className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Product Image */}
              <div className="flex gap-4">
                <img
                  src={product.imageCover.url}
                  alt={product.name}
                  className="h-20 w-20 rounded-xl border border-border object-cover"
                />

                <div className="flex-1">
                  <h2 className="font-semibold">{product.name}</h2>

                  <p className="text-sm text-muted-foreground">
                    {product.brand}
                  </p>
                </div>
              </div>

              {/* Product Details */}
              <div className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>

                  <span>{product.category.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>

                  <span className="font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stock</span>

                  <span>{product.stock}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating</span>

                  <span>
                    ⭐ {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>

                  {product.stock > 0 ? (
                    <span className="rounded-full bg-success/15 px-3 py-1 text-xs text-success">
                      In Stock
                    </span>
                  ) : (
                    <span className="rounded-full bg-error/15 px-3 py-1 text-xs text-error">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-2">
                <button className="flex-1 rounded-xl bg-secondary py-2 transition hover:bg-secondary-foreground hover:text-white">
                  Edit
                </button>

                <button className="rounded-xl bg-error/10 px-4 text-error transition hover:bg-error hover:text-white">
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default AdminProducts;
