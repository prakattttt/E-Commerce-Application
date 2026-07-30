import { useMemo, useState } from "react";
import { motion } from "framer-motion";

interface ProductImage {
  url: string;
  publicId: string;
}

interface ProductGalleryProps {
  imageCover: ProductImage;
  images: ProductImage[];
}

const ProductGallery = ({ imageCover, images }: ProductGalleryProps) => {
  const gallery = useMemo(
    () => [imageCover, ...images].filter((img) => img?.url),
    [imageCover, images],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keep the index valid if the gallery changes.
  const currentIndex = selectedIndex >= gallery.length ? 0 : selectedIndex;

  const selectedImage = gallery[currentIndex];

  if (gallery.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-3xl border border-border bg-muted/40">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v13.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V16.5zm0 2.25l5.25-5.25a1.5 1.5 0 012.12 0l2.13 2.13 3.38-3.38a1.5 1.5 0 012.12 0L21 15.25M8.25 8.25h.008v.008H8.25V8.25z"
              />
            </svg>
          </div>

          <div>
            <p className="font-medium text-foreground">No images available</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Images for this product haven't been uploaded yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Thumbnails */}
      <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:w-24 lg:flex-col">
        {gallery.map((image, index) => (
          <button
            key={image.publicId}
            onClick={() => setSelectedIndex(index)}
            className={`overflow-hidden rounded-xl border transition ${
              currentIndex === index
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-primary/50"
            }`}
          >
            <img
              src={image.url}
              alt="Product thumbnail"
              onError={(e) => {
                e.currentTarget.onerror = null;
              }}
              className="h-20 w-20 object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <motion.div
        key={selectedImage.publicId}
        initial={{ opacity: 0.5, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="group relative order-1 h-72 w-full overflow-hidden rounded-3xl border border-border bg-card sm:h-96 md:h-105 lg:h-120 lg:max-w-140"
      >
        <img
          src={selectedImage.url}
          alt="Product"
          onError={(e) => {
            e.currentTarget.onerror = null;
          }}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </motion.div>
    </div>
  );
};

export default ProductGallery;
