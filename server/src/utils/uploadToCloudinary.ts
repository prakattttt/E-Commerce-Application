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
