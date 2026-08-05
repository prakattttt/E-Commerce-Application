import type { UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";
import cloudinary from "./Cloudinary.js";

export const uploadToCloudinary = (
  file: Express.Multer.File,
  folder: string = "products",
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary upload failed."));
        resolve(result);
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

export const uploadImages = async (
  files: Express.Multer.File[],
  folder = "products",
) => {
  const uploads = await Promise.all(
    files.map((file) => uploadToCloudinary(file, folder)),
  );

  return uploads.map((image) => ({
    url: image.secure_url,
    publicId: image.public_id,
  }));
};
