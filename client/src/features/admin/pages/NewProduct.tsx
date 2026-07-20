import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

import { fadeUp } from "../../../animations";
import ProductBasicInfoForm from "../components/ProductBasicInfoForm";
import ProductPricingForm from "../components/ProductPricingForm";
import ProductExtraDetailsForm from "../components/ProductExtraDetailsForm";
import ProductImagesForm from "../components/ProductImagesForm";
import FormActions from "../components/FormActions";
import { createProduct } from "../api/admin.api";
import { getCategories } from "../../shop/api/categories.api";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import type { ICategory } from "../../shop/types/categories.types";
import type { CreateProductPayload } from "../types/products.types";

const NewProduct = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState("");

  const [badge, setBadge] = useState("");

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories);
      } catch (error) {
        getErrorMessage(error);
      }
    };

    fetchCategories();
  }, []);

  const handleSave = async () => {
    if (
      !productName.trim() ||
      !description.trim() ||
      !brand.trim() ||
      !category ||
      !price ||
      !stock
    ) {
      getErrorMessage(new Error("Please fill in all required fields."));
      return;
    }

    const payload: CreateProductPayload = {
      name: productName.trim(),
      description: description.trim(),
      brand: brand.trim(),
      category,
      price: Number(price),
      stock: Number(stock),
    };

    if (originalPrice) payload.originalPrice = Number(originalPrice);
    if (badge.trim()) payload.badge = badge.trim();

    try {
      setSubmitting(true);
      const response = await createProduct(payload);
      console.log(response);
      navigate("/admin/products");
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setSubmitting(false);
    }
  };

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
        categories={categories}
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
      />

      <ProductImagesForm />

      <FormActions
        cancelTo="/admin/products"
        saveLabel="Save Product"
        onSave={handleSave}
        loading={submitting}
      />
    </motion.section>
  );
};

export default NewProduct;
