import type { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError.js";
import env from "../config/env.js";
import { ZodError } from "zod";

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

  //Other errors
  const error =
    err instanceof AppError
      ? err
      : new AppError(
          err instanceof Error ? err.message : "Internal Server Error",
          500,
        );

  const responseBody: Record<string, unknown> = {
    status: error.status,
    statusCode: error.statusCode,
    message: error.message,
  };

  if (env.environment === "development") {
    responseBody["stack"] = error.stack;
  }

  return res.status(error.statusCode).json(responseBody);
};

export const notFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next(new AppError("URL not found", 404));
};
