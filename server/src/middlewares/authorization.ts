import type { RequestHandler } from "express";
import AppError from "../utils/AppError.js";
import type { UserRole } from "../models/users.models.js";

// middleware to authorize user roles
export const authorize = (role: UserRole): RequestHandler => {
  return (req, _res, next) => {
    // protect middleware runs before this
    if (!req.user) {
      throw new AppError("You are not authenticated", 401);
    }

    if (role !== req.user.role) {
      throw new AppError(
        "You do not have permission to perform this action",
        403,
      );
    }

    next();
  };
};
