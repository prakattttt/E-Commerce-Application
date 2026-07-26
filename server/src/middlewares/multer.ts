import multer from "multer";
import AppError from "../utils/AppError.js";

const storage = multer.memoryStorage();

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
    return;
  }

  cb(new AppError("Only images are allowed", 400));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 6,
  },
});

export default upload;
