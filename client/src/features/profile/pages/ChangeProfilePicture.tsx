import { ArrowLeft, Camera, Upload, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

import { fadeUp } from "../../../animations";

const ChangeProfilePicture = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select an image");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("avatar", file);

      console.log(formData);

      toast.success("Profile picture updated successfully");
    } catch {
      toast.error("Failed to update profile picture");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-3xl px-6 py-10"
    >
      <Link
        to="/profile"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
      >
        <ArrowLeft size={17} />
        Back to Settings
      </Link>

      <div className="mb-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Camera size={23} />
        </div>

        <h1 className="font-display text-3xl font-bold">
          Change Profile Picture
        </h1>

        <p className="mt-2 text-muted-foreground">
          Upload a new profile picture for your account.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-primary/10">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Camera size={42} className="text-primary" />
              )}
            </div>

            {preview && (
              <button
                type="button"
                onClick={removeFile}
                className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-md transition hover:bg-secondary"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <label
            htmlFor="avatar"
            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-secondary"
          >
            <Upload size={17} />
            Choose Image
            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <p className="mt-3 text-xs text-muted-foreground">
            JPG, PNG or WEBP. Maximum size 5MB.
          </p>

          {file && (
            <p className="mt-2 text-sm font-medium text-foreground">
              {file.name}
            </p>
          )}
        </div>

        <div className="mt-8 flex justify-start gap-3 border-t border-border pt-6">
          <Link
            to="/profile"
            className="rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-secondary"
          >
            Cancel
          </Link>

          <button
            type="button"
            disabled={!file || submitting}
            onClick={handleSubmit}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Uploading..." : "Update Picture"}
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default ChangeProfilePicture;
