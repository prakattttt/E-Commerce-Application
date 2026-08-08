import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { fadeUp } from "../../../animations";

import ProductBasicInfoForm from "../components/ProductBasicInfoForm";
import ProductPricingForm from "../components/ProductPricingForm";
import ProductExtraDetailsForm from "../components/ProductExtraDetailsForm";
import ProductVisibilityForm from "../components/ProductVisibilityForm";
import ProductImagesForm from "../components/ProductImagesForm";
import FormActions from "../components/FormActions";

import { updateProduct } from "../api/admin.api";

import { getProductBySlug } from "../../shop/api/products.api";
import { getCategories } from "../../shop/api/categories.api";

import type { IProduct, IProductImage } from "../../shop/types/products.types";
import type { ICategory } from "../../shop/types/categories.types";
import { toast } from "sonner";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { productSchema } from "../types/schemas/products.schemas";
import type { ProductFormValues } from "../types/schemas/products.schemas";

const EditProduct = () => {
  const { slug } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const [existingCover, setExistingCover] = useState<
    IProductImage | undefined
  >();
  const [existingImages, setExistingImages] = useState<IProductImage[]>([]);

  const [imageCover, setImageCover] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);

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
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!slug) return;

        const [categoryRes, productRes] = await Promise.all([
          getCategories(),
          getProductBySlug(slug),
        ]);

        setCategories(categoryRes.categories);

        const product: IProduct = productRes.product;

        setExistingCover(product.imageCover);
        setExistingImages(product.images);

        reset({
          name: product.name,
          description: product.description,
          brand: product.brand,
          category: product.category._id,
          price: product.price,
          originalPrice:
            product.originalPrice !== undefined &&
            product.originalPrice !== null
              ? product.originalPrice
              : undefined,
          stock: product.stock,
          badge: product.badge ?? "",
          featured: product.featured,
          flashSale: product.flashSale,
        });
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reset, slug]);

  const handleSave = async (data: ProductFormValues) => {
    if (!slug) return;

    try {
      setSubmitting(true);

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

      formData.append(
        "existingImages",
        JSON.stringify(existingImages.map((img) => img.publicId)),
      );

      await updateProduct(formData, slug);

      toast.success("Product updated successfully");

      navigate("/admin/products");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <motion.form
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-5xl space-y-8"
      onSubmit={handleSubmit(handleSave)}
    >
      <div>
        <Link
          to="/admin/products"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>

        <h1 className="font-display text-3xl font-bold">Edit Product</h1>

        <p className="mt-2 text-muted-foreground">
          Update the product information.
        </p>
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
        existingCover={existingCover}
        existingImages={existingImages}
        onRemoveExistingCover={() => setExistingCover(undefined)}
        onRemoveExistingImage={(publicId) =>
          setExistingImages((prev) =>
            prev.filter((img) => img.publicId !== publicId),
          )
        }
      />

      <FormActions
        cancelTo="/admin/products"
        saveLabel="Update Product"
        loading={submitting}
      />
    </motion.form>
  );
};

export default EditProduct;
