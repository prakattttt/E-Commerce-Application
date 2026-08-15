import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";
import { registerSchema, loginSchema } from "../validators/users.validators.js";
import AppError from "../utils/AppError.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";
import { User } from "../models/users.models.js";

import {
  registerUserService,
  loginUserService,
  getMeService,
  updateUserService,
  changePasswordService,
  deleteUserService,
} from "../services/users.services.js";

import { generateToken } from "../utils/generateToken.js";

// Cookie options

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// REGISTER

export const registerUser: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const data = registerSchema.parse(req.body);

    const user = await registerUserService(data);

    const token = generateToken(user._id.toString());

    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({
        success: true,

        message: "Account created successfully",

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        },
      });
  },
);

// LOGIN

export const loginUser: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const data = loginSchema.parse(req.body);

    const user = await loginUserService(data);

    const token = generateToken(user._id.toString());

    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        success: true,

        message: "Login successful",

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        },
      });
  },
);

// LOGOUT

export const logoutUser: RequestHandler = expressAsyncHandler(
  async (_req, res) => {
    res.clearCookie("token", cookieOptions).status(200).json({
      success: true,

      message: "Logged out successfully",
    });
  },
);

// GET CURRENT USER

export const getMe: RequestHandler = expressAsyncHandler(async (req, res) => {
  const user = await getMeService(req.user._id.toString());

  res.status(200).json({
    success: true,

    user,
  });
});

// UPDATE PROFILE

export const updateUser: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const user = await updateUserService(req.user._id.toString(), req.body);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  },
);

// CHANGE AVATAR

export const updateAvatar: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    if (!req.file) {
      throw new AppError("Please upload an image", 400);
    }

    const userId = req.user._id.toString();

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      throw new AppError("User not found", 404);
    }

    const previousAvatarPublicId = currentUser.avatar?.publicId;

    const uploadedImage = await uploadToCloudinary(
      req.file,
      "shopsphere/avatars",
    );

    const user = await updateUserService(userId, {
      avatar: {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      },
    });

    if (previousAvatarPublicId) {
      await deleteFromCloudinary(previousAvatarPublicId);
    }

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user,
    });
  },
);

// CHANGE PASSWORD

export const changePassword: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    await changePasswordService(
      req.user._id.toString(),
      currentPassword,
      newPassword,
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  },
);

// DELETE ACCOUNT

export const deleteUser: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const { password } = req.body;

    await deleteUserService(req.user._id.toString(), password);

    res.clearCookie("token", cookieOptions).status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  },
);
