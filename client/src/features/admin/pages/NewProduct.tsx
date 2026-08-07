import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { fadeUp } from "../../../animations";
import ProductBasicInfoForm from "../components/ProductBasicInfoForm";
import ProductPricingForm from "../components/ProductPricingForm";
import ProductExtraDetailsForm from "../components/ProductExtraDetailsForm";
import ProductVisibilityForm from "../components/ProductVisibilityForm";
import ProductImagesForm from "../components/ProductImagesForm";
import FormActions from "../components/FormActions";
import { createProduct } from "../api/admin.api";
import { getCategories } from "../../shop/api/categories.api";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import type { ICategory } from "../../shop/types/categories.types";
import { productSchema } from "../types/schemas/products.schemas";
import type { ProductFormValues } from "../types/schemas/products.schemas";

const NewProduct = () => {
  const navigate = useNavigate();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      price: 0,
      originalPrice: undefined,
      stock: 0,
      badge: "",
      featured: false,
      flashSale: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [imageCover, setImageCover] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
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

  const onSubmit = async (data: ProductFormValues) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    if (imageCover) {
      formData.append("imageCover", imageCover);
    }

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      setSubmitting(true);
      await createProduct(formData);
      toast.success("Product created successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-5xl space-y-8"
      onSubmit={handleSubmit(onSubmit)}
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
        register={register}
        errors={errors}
        categories={categories}
      />

      <ProductPricingForm register={register} errors={errors} />

      <ProductExtraDetailsForm register={register} />

      <ProductVisibilityForm register={register} />

      <ProductImagesForm
        imageCover={imageCover}
        onImageCoverChange={setImageCover}
        images={images}
        onImagesChange={setImages}
      />

      <FormActions
        cancelTo="/admin/products"
        saveLabel="Save Product"
        loading={submitting}
      />
    </motion.form>
  );
};

export default NewProduct;
