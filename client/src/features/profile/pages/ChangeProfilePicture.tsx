import { ArrowLeft, Camera, Upload, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

import { fadeUp } from "../../../animations";
import { updateProfilePicture } from "../api/profile.api";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { compressImage } from "../../../utils/compressImage";
import useAuth from "../../auth/hooks/useAuth";

const ChangeProfilePicture = () => {
  const { user, setUser } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const compressedFile = await compressImage(selectedFile);

    if (compressedFile.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(compressedFile);
    setPreview(URL.createObjectURL(compressedFile));
  };

  const removeFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

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

      const response = await updateProfilePicture(file);

      if (user) {
        const temporaryUrl = URL.createObjectURL(file);

        setUser({
          ...user,
          avatar: {
            ...user.avatar,
            url: temporaryUrl,
            publicId: user.avatar?.publicId ?? "",
          },
        });
      }

      toast.success(response.message);

      navigate(-1);

      removeFile();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10"
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

      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-primary/10 sm:h-40 sm:w-40">
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
                aria-label="Remove selected image"
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
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            JPG, PNG or WEBP. Maximum size 5MB.
          </p>

          {file && (
            <p className="mt-2 max-w-full truncate text-sm font-medium text-foreground">
              {file.name}
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
          <Link
            to="/profile/settings"
            className="rounded-xl border border-border px-5 py-3 text-center text-sm font-semibold transition hover:bg-secondary"
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
