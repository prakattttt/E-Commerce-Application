import { motion } from "framer-motion";
import { ImagePlus, X } from "lucide-react";

import { fadeUp } from "../../../animations";

interface ProductImagesFormProps {
  imageCover: File | null;
  onImageCoverChange: (file: File | null) => void;

  images: File[];
  onImagesChange: (files: File[]) => void;
}

const ProductImagesForm = ({
  imageCover,
  onImageCoverChange,
  images,
  onImagesChange,
}: ProductImagesFormProps) => {
  const removeGalleryImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <h2 className="mb-6 font-display text-xl font-bold">Product Images</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-3 block text-sm font-medium">Cover Image</label>

          <label className="flex h-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-background transition hover:border-primary hover:bg-secondary/30">
            {imageCover ? (
              <div className="relative h-full w-full">
                <img
                  src={URL.createObjectURL(imageCover)}
                  alt="Cover"
                  className="h-full w-full object-cover"
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onImageCoverChange(null);
                  }}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-error"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <ImagePlus size={40} className="mb-3 text-muted-foreground" />

                <p className="font-medium">Upload Cover Image</p>

                <span className="mt-1 text-sm text-muted-foreground">
                  PNG, JPG or WEBP
                </span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => onImageCoverChange(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium">
            Gallery Images
          </label>

          <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background transition hover:border-primary hover:bg-secondary/30">
            <ImagePlus size={36} className="mb-3 text-muted-foreground" />

            <p className="font-medium">Upload Multiple Images</p>

            <span className="mt-1 text-sm text-muted-foreground">
              Select multiple product images
            </span>

            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);

                onImagesChange([...images, ...files]);
              }}
            />
          </label>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <label className="block text-sm font-medium">Image Preview</label>

          <span className="text-xs text-muted-foreground">
            {images.length} image{images.length !== 1 && "s"} selected
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border"
            >
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-error"
              >
                <X size={14} />
              </button>
            </div>
          ))}

          <label className="flex h-24 w-24 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-background text-muted-foreground transition hover:border-primary hover:bg-secondary/30">
            <ImagePlus size={20} />

            <span className="text-xs">Add</span>

            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);

                onImagesChange([...images, ...files]);
              }}
            />
          </label>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductImagesForm;
