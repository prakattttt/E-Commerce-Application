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
import useDelayedLoading from "../hooks/useDelayedLoading";

const ProductDetails = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const showLoader = useDelayedLoading(loading);

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

  if (showLoader) {
    return <Loader fullScreen />;
  }

  if (!product) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        Product not found.
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
