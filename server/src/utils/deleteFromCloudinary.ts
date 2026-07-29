import cloudinary from "./Cloudinary.js";

export const deleteFromCloudinary = async (publicId: string) => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete failed:", error);
  }
};