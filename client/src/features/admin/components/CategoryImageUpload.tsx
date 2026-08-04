import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { useMemo, useEffect } from "react";
import { compressImage } from "../../../utils/compressImage";

import { fadeUp } from "../../../animations";

interface CategoryImageFormProps {
  image: File | null;
  onImageChange: (file: File | null) => void;
}

const CategoryImageUpload = ({
  image,
  onImageChange,
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

      <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border transition hover:border-primary">
        {image && previewUrl ? (
          <div className="relative h-full w-full">
            <img
              src={previewUrl}
              alt="Cover"
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-error"
            >
              <X
                size={16}
                onClick={(e) => {
                  e.preventDefault();
                  onImageChange(null);
                }}
              />
            </button>
          </div>
        ) : (
          <>
            <Upload size={40} className="mb-3 text-muted-foreground" />

            <p className="font-medium">Upload Cover Image</p>

            <span className="mt-1 text-sm text-muted-foreground">
              PNG, JPG or WEBP
            </span>
          </>
        )}

        <input
          type="file"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </motion.div>
  );
};

export default CategoryImageUpload;
