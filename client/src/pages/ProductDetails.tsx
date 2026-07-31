import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductBreadcrumb from "../features/shop/components/product-details/ProductBreadcrumb";
import ProductGallery from "../features/shop/components/product-details/ProductGallery";
import ProductInfo from "../features/shop/components/product-details/ProductInfo";
import ProductReviews from "../features/shop/components/product-details/ProductReviews";
import RelatedProducts from "../features/shop/components/product-details/RelatedProducts";

import { getProductBySlug } from "../features/shop/api/products.api";

import type { IProduct } from "../features/shop/types/products.types";
import { getErrorMessage } from "../utils/getErrorMessage";
import { toast } from "sonner";
import Loader from "../components/ui/Loader";
import { PackageSearch, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { scaleIn } from "../animations";

const ProductDetails = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!slug) return;

        const response = await getProductBySlug(slug);
        setProduct(response.product);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!product) {
    return (
      <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-28 text-center">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
            <PackageSearch className="text-primary" size={40} />
          </div>

          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            Product Not Found
          </h1>

          <p className="mt-3 max-w-md text-muted-foreground">
            We couldn't find the product you're looking for. It may have been
            removed or the link might be incorrect.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <ArrowLeft size={18} />
              Browse Products
            </Link>

            <Link
              to="/"
              className="rounded-xl border border-border bg-card px-6 py-3 font-semibold transition hover:bg-secondary"
            >
              Go to Home
            </Link>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <ProductBreadcrumb
        category={product.category}
        productName={product.name}
      />

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-start">
        <div className="lg:sticky lg:top-24">
          <ProductGallery
            imageCover={product.imageCover}
            images={product.images}
          />
        </div>

        <ProductInfo product={product} />
      </div>

      <ProductReviews product={product} />

      <RelatedProducts
        categorySlug={product.category.slug}
        currentProductId={product._id}
      />
    </section>
  );
};

export default ProductDetails;
