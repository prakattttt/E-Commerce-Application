import { User } from "../models/users.models.js";
import AppError from "../utils/AppError.js";

// Register user
export const registerUserService = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new AppError("User already exists with this email", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  return user;
};

// Login user
export const loginUserService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  return user;
};

// Get current user
export const getMeService = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

// Update profile
export const updateUserService = async (
  userId: string,
  data: {
    name?: string;
    avatar?: {
      url: string;
      publicId: string;
    };
  },
) => {
  const user = await User.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

// Delete account
export const deleteUserService = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};
