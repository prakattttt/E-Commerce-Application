import { motion } from "framer-motion";
import { ArrowLeft, ImagePlus, Save, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import { fadeUp } from "../../../animations";

const dummyCategories = ["Electronics", "Fashion", "Shoes", "Accessories"];

const NewProduct = () => {
  const [productName, setProductName] = useState("");

  const [description, setDescription] = useState("");

  const [brand, setBrand] = useState("");

  const [category, setCategory] = useState("");

  const [price, setPrice] = useState("");

  const [originalPrice, setOriginalPrice] = useState("");

  const [stock, setStock] = useState("");

  const [status, setStatus] = useState("draft");

  const [badge, setBadge] = useState("");

  const [rating, setRating] = useState("");

  const [reviews, setReviews] = useState("");

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-5xl space-y-8"
    >
      {/* Page Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            to="/admin/products"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>

          <h1 className="font-display text-3xl font-bold">Add New Product</h1>

          <p className="mt-2 text-muted-foreground">
            Fill in the information below to add a new product.
          </p>
        </div>
      </div>

      {/* Basic Information */}

      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h2 className="mb-6 font-display text-xl font-bold">
          Basic Information
        </h2>

        <div className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Product Name
              </label>

              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="iPhone 16 Pro"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Brand</label>

              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Apple"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
              >
                <option value="">Select Category</option>

                {dummyCategories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Visibility
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write product description..."
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>
        </div>
      </motion.div>

      {/* Pricing & Inventory */}

      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h2 className="mb-6 font-display text-xl font-bold">
          Pricing & Inventory
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Selling Price
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="999"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Original Price
            </label>

            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="1199"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Stock Quantity
            </label>

            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="20"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>
        </div>
      </motion.div>

      {/* Extra Details */}

      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h2 className="mb-6 font-display text-xl font-bold">Extra Details</h2>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium">Badge</label>

            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="Best Seller"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Rating</label>

            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="4.8"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Reviews</label>

            <input
              type="number"
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
              placeholder="120"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>
        </div>
      </motion.div>

      {/* Product Images */}

      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h2 className="mb-6 font-display text-xl font-bold">Product Images</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-3 block text-sm font-medium">
              Cover Image
            </label>

            <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background transition hover:border-primary hover:bg-secondary/30">
              <ImagePlus size={40} className="mb-3 text-muted-foreground" />

              <p className="font-medium">Upload Cover Image</p>

              <span className="mt-1 text-sm text-muted-foreground">
                PNG, JPG or WEBP
              </span>

              <input type="file" hidden />
            </label>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium">
              Gallery Images
            </label>

            <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background transition hover:border-primary hover:bg-secondary/30">
              <ImagePlus size={36} className="mb-3 text-muted-foreground" />

              <p className="font-medium">Upload Multiple Images</p>

              <span className="mt-1 text-sm text-muted-foreground">
                Select multiple product images
              </span>

              <input type="file" multiple hidden />
            </label>
          </div>
        </div>

        {/* Preview */}

        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <label className="block text-sm font-medium">Image Preview</label>

            <span className="text-xs text-muted-foreground">
              3 images selected
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {[1, 2, 3].map((image) => (
              <div
                key={image}
                className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border"
              >
                <div className="h-full w-full bg-secondary" />

                <button
                  type="button"
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-error"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            <label className="flex h-24 w-24 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-background text-muted-foreground transition hover:border-primary hover:bg-secondary/30">
              <ImagePlus size={20} />
              <span className="text-xs">Add</span>
              <input type="file" multiple hidden />
            </label>
          </div>
        </div>
      </motion.div>

      {/* Form Actions */}

      <div className="flex flex-col-reverse gap-4 border-t border-border pt-8 sm:flex-row sm:justify-end">
        <Link
          to="/admin/products"
          className="rounded-xl border border-border px-8 py-3 text-center font-medium transition hover:bg-secondary"
        >
          Cancel
        </Link>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Save size={18} />
          Save Product
        </button>
      </div>
    </motion.section>
  );
};

export default NewProduct;
