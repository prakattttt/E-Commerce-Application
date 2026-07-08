import type { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import { User } from "../models/users.models.js";
import AppError from "../utils/AppError.js";

export const protect: RequestHandler = expressAsyncHandler(
  async (req, _res, next) => {
    // Get token from cookie

    const token = req.cookies.token;

    if (!token) {
      throw new AppError("You are not logged in", 401);
    }

    // Verify token

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    // Find user

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError("User no longer exists", 401);
    }

    // Attach user

    req.user = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  },
);
