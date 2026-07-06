import dotenv from "dotenv/config";

import express from "express";
import connectToDb from "./config/db.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import env from "./config/env.js";

const app = express();

app.use(express.json());

app.use(notFoundHandler);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToDb();

    app.listen(env.port, () => {
      console.log(`Server is running on port ${env.port}`);
    });
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

startServer();
