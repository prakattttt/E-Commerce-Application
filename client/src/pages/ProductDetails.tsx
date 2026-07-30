import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductBreadcrumb from "../features/shop/components/product-details/ProductBreadcrumb";
import ProductGallery from "../features/shop/components/product-details/ProductGallery";
import ProductInfo from "../features/shop/components/product-details/ProductInfo";
import ProductDescription from "../features/shop/components/product-details/ProductDescription";
import ProductReviews from "../features/shop/components/product-details/ProductReviews";
import RelatedProducts from "../features/shop/components/product-details/RelatedProducts";

import { getProductBySlug } from "../features/shop/api/products.api";

import type { IProduct } from "../features/shop/types/products.types";

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
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">Loading...</section>
    );
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

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <ProductGallery
          imageCover={product.imageCover}
          images={product.images}
        />

        <ProductInfo product={product} />
      </div>
      <ProductDescription product={product} />

      <ProductReviews product={product} />

      <RelatedProducts
        categorySlug={product.category.slug}
        currentProductId={product._id}
      />
    </section>
  );
};

export default ProductDetails;
