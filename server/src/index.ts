import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import connectToDb from "./config/db.js";
import env from "./config/env.js";

import userRoutes from "./routes/users.routes.js";

import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const app = express();

// Security headers
app.use(helmet());

// Compress responses
app.use(compression());

// HTTP request logger
if (env.environment === "development") {
  app.use(morgan("dev"));
}

// CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true,
  }),
);

// Body parsers
app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  }),
);

// Cookie parser
app.use(cookieParser());

// Health check
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "API is running!",
  });
});

// API Routes
app.use("/api/users", userRoutes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToDb();

    app.listen(env.port, () => {
      console.log(
        `Server running on http://localhost:${env.port} (${env.environment})`,
      );
    });
  } catch (error) {
    console.error("Database connection failed");
    console.error(error);
    process.exit(1);
  }
};

startServer();
