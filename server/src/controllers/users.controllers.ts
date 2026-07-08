import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";

import {
  registerUserService,
  loginUserService,
  getMeService,
  updateUserService,
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
    const { name, email, password } = req.body;

    const user = await registerUserService({
      name,
      email,
      password,
    });

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
        },
      });
  },
);

// LOGIN

export const loginUser: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const { email, password } = req.body;

    const user = await loginUserService({
      email,
      password,
    });

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
        },
      });
  },
);

// LOGOUT

export const logoutUser: RequestHandler = expressAsyncHandler(
  async (req, res) => {
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

      message: "Profile updated",

      user,
    });
  },
);

// DELETE ACCOUNT

export const deleteUser: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    await deleteUserService(req.user._id.toString());

    res.clearCookie("token", cookieOptions).status(200).json({
      success: true,

      message: "Account deleted",
    });
  },
);
