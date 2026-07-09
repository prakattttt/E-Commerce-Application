import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { MongoServerError } from "mongodb";
import { ZodError } from "zod";

import AppError from "../utils/AppError.js";
import env from "../config/env.js";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Zod validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "fail",
      statusCode: 400,
      message: err.issues.map((issue) => issue.message),
    });
  }

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      status: "fail",
      statusCode: 400,
      message: Object.values(err.errors).map((error) => error.message),
    });
  }

  // Invalid MongoDB ObjectId
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      status: "fail",
      statusCode: 400,
      message: `Invalid ${err.path}`,
    });
  }

  // Duplicate key error
  if (err instanceof MongoServerError && err.code === 11000) {
    const field = Object.keys(err.keyPattern ?? {})[0];

    return res.status(409).json({
      status: "fail",
      statusCode: 409,
      message: `${field} already exists`,
    });
  }

  // Custom application errors
  if (err instanceof AppError) {
    const responseBody: Record<string, unknown> = {
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
    };

    if (env.environment === "development") {
      responseBody.stack = err.stack;
    }

    return res.status(err.statusCode).json(responseBody);
  }

  // Unknown errors
  const error = err instanceof Error ? err : new Error("Internal Server Error");

  const responseBody: Record<string, unknown> = {
    status: "error",
    statusCode: 500,
    message: error.message,
  };

  if (env.environment === "development") {
    responseBody.stack = error.stack;
  }

  return res.status(500).json(responseBody);
};

export const notFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next(new AppError("URL not found", 404));
};
