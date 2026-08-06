import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { useMemo, useEffect } from "react";

import { fadeUp } from "../../../animations";
import { compressImage } from "../../../utils/compressImage";

interface CategoryImageFormProps {
  image: File | null;
  onImageChange: (file: File | null) => void;

  existingImage?: {
    url: string;
    publicId: string;
  };
}

const CategoryImageUpload = ({
  image,
  onImageChange,
  existingImage,
}: CategoryImageFormProps) => {
  const previewUrl = useMemo(() => {
    if (!image) return null;

    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const compressed = await compressImage(file);

    onImageChange(compressed);
  };

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <h2 className="mb-6 font-display text-xl font-bold">Category Image</h2>

      <label className="flex h-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border transition hover:border-primary">
        {image ? (
          <div className="relative h-full w-full">
            <img
              src={previewUrl!}
              alt="Preview"
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onImageChange(null);
              }}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-error"
            >
              <X size={16} />
            </button>
          </div>
        ) : existingImage ? (
          <div className="relative h-full w-full">
            <img
              src={existingImage.url}
              alt="Category"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <>
            <Upload size={40} className="mb-3 text-muted-foreground" />

            <p className="font-medium">Upload Category Image</p>

            <span className="mt-1 text-sm text-muted-foreground">
              PNG, JPG or WEBP
            </span>
          </>
        )}

        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </label>

      {existingImage && !image && (
        <p className="mt-3 text-xs text-muted-foreground">
          Select a new image only if you want to replace the current one.
        </p>
      )}
    </motion.div>
  );
};

export default CategoryImageUpload;
