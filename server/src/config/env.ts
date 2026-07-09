import "dotenv/config";

interface EnvInterface {
  port: number;
  dbUrl: string;
  environment: "production" | "development" | "testing";
  JWTSecret: string;
}

const env: EnvInterface = {
  port: Number(process.env.PORT) || 5000,
  dbUrl: process.env.DB_URL!,
  environment: (process.env.ENVIRONMENT ??
    "development") as EnvInterface["environment"],
  JWTSecret: process.env.JWT_SECRET!,
};

export default env;