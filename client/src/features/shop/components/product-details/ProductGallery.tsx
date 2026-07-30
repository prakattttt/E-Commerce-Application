import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";

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

  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(
    gallery[0] ?? null,
  );

  if (!selectedImage) {
    return (
      <div className="flex aspect-square w-full flex-col items-center justify-center rounded-3xl border border-border bg-secondary">
        <ImageOff size={48} className="mb-3 text-muted-foreground" />

        <p className="font-medium">No Images Available</p>

        <p className="mt-1 text-sm text-muted-foreground">
          This product has no uploaded images.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Thumbnails */}
      <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:w-24 lg:flex-col">
        {gallery.map((image) => (
          <button
            key={image.publicId}
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-xl border transition ${
              selectedImage.publicId === image.publicId
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-primary/50"
            }`}
          >
            <img src={image.url} alt="" className="h-20 w-20 object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <motion.div
        key={selectedImage.publicId}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="order-1 h-72 w-full overflow-hidden rounded-3xl border border-border bg-card sm:h-96 md:h-105 lg:h-120 lg:max-w-140"
      >
        <img
          src={selectedImage.url}
          alt="Product"
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </motion.div>
    </div>
  );
};

export default ProductGallery;
