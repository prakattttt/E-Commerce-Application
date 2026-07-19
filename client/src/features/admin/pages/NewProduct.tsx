import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import { fadeUp } from "../../../animations";
import ProductBasicInfoForm from "../components/ProductBasicInfoForm";
import ProductPricingForm from "../components/ProductPricingForm";
import ProductExtraDetailsForm from "../components/ProductExtraDetailsForm";
import ProductImagesForm from "../components/ProductImagesForm";
import FormActions from "../components/FormActions";

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

      <ProductBasicInfoForm
        productName={productName}
        onProductNameChange={setProductName}
        brand={brand}
        onBrandChange={setBrand}
        category={category}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
        description={description}
        onDescriptionChange={setDescription}
      />

      <ProductPricingForm
        price={price}
        onPriceChange={setPrice}
        originalPrice={originalPrice}
        onOriginalPriceChange={setOriginalPrice}
        stock={stock}
        onStockChange={setStock}
      />

      <ProductExtraDetailsForm
        badge={badge}
        onBadgeChange={setBadge}
        rating={rating}
        onRatingChange={setRating}
        reviews={reviews}
        onReviewsChange={setReviews}
      />

      <ProductImagesForm />

      <FormActions cancelTo="/admin/products" saveLabel="Save Product" />
    </motion.section>
  );
};

export default NewProduct;
