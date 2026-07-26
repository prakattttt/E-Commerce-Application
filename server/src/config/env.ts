import "dotenv/config";

interface EnvInterface {
  port: number;
  dbUrl: string;
  environment: "production" | "development" | "testing";
  JWTSecret: string;
}

interface ICloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

const env: EnvInterface = {
  port: Number(process.env.PORT) || 5000,
  dbUrl: process.env.DB_URL!,
  environment: (process.env.ENVIRONMENT ??
    "development") as EnvInterface["environment"],
  JWTSecret: process.env.JWT_SECRET!,
};

export const cloudinary_config: ICloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
};

export default env;
