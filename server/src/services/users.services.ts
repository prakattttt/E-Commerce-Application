import { User } from "../models/users.models.js";
import AppError from "../utils/AppError.js";
import { Cart } from "../models/carts.models.js";
import bcrypt from "bcryptjs";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";

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

interface UpdateUserData {
  name?: string;

  email?: string;

  avatar?: {
    url: string;
    publicId: string;
  };
}

// UPDATE USER

export const updateUserService = async (
  userId: string,
  data: UpdateUserData,
) => {
  const updateData: UpdateUserData = {};

  // Only allow specific fields to be updated

  if (data.name !== undefined) {
    updateData.name = data.name;
  }

  if (data.email !== undefined) {
    updateData.email = data.email;
  }

  if (data.avatar !== undefined) {
    updateData.avatar = data.avatar;
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: updateData,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

// CHANGE PASSWORD

export const changePasswordService = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
) => {
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isPasswordCorrect = await bcrypt.compare(
    currentPassword,
    user.password as string,
  );

  if (!isPasswordCorrect) {
    throw new AppError("Current password is incorrect", 400);
  }

  user.password = newPassword;

  await user.save();

  return user;
};

// DELETE ACCOUNT

export const deleteUserService = async (userId: string, password: string) => {
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password as string);

  if (!isPasswordCorrect) {
    throw new AppError("Incorrect password", 400);
  }

  const avatarPublicId = user.avatar?.publicId;
  await Cart.findOneAndDelete({
    user: userId,
  });

  await User.findByIdAndDelete(userId);

  // Delete avatar from Cloudinary

  if (avatarPublicId) {
    await deleteFromCloudinary(avatarPublicId);
  }

  return user;
};
