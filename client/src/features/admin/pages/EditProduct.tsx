import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

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

const EditProduct = () => {
  const { slug } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [categories, setCategories] = useState<ICategory[]>([]);

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState("");

  const [badge, setBadge] = useState("");

  const [featured, setFeatured] = useState(false);
  const [flashSale, setFlashSale] = useState(false);

  // Existing Images
  const [existingCover, setExistingCover] = useState<
    IProductImage | undefined
  >();

  const [existingImages, setExistingImages] = useState<IProductImage[]>([]);

  // Newly Uploaded Images
  const [imageCover, setImageCover] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);

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

        setProductName(product.name);
        setDescription(product.description);
        setBrand(product.brand);

        setCategory(product.category._id);

        setPrice(product.price.toString());
        setOriginalPrice(
          product.originalPrice !== undefined && product.originalPrice !== null
            ? product.originalPrice.toString()
            : product.price.toString()
        );
        setStock(product.stock.toString());

        setBadge(product.badge ?? "");

        setFeatured(product.featured);
        setFlashSale(product.flashSale);

        setExistingCover(product.imageCover);
        setExistingImages(product.images);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleSave = async () => {
    if (!slug) return;

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("name", productName.trim());
      formData.append("description", description.trim());
      formData.append("brand", brand.trim());

      formData.append("category", category);

      formData.append("price", price);
      formData.append("originalPrice", originalPrice || price);
      formData.append("stock", stock);

      formData.append("badge", badge);

      formData.append("featured", String(featured));
      formData.append("flashSale", String(flashSale));

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
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-5xl space-y-8"
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

      <ProductExtraDetailsForm badge={badge} onBadgeChange={setBadge} />

      <ProductVisibilityForm
        featured={featured}
        onFeaturedChange={setFeatured}
        flashSale={flashSale}
        onFlashSaleChange={setFlashSale}
      />

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
        onSave={handleSave}
      />
    </motion.section>
  );
};

export default EditProduct;
