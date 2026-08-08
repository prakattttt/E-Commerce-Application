import imageCompression from "browser-image-compression";

export const compressImage = async (file: File) => {
  const options = {
    maxSizeMB: 4,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  return await imageCompression(file, options);
};

export const compressImages = async (files: File[]) => {
  return Promise.all(files.map((file) => compressImage(file)));
};
