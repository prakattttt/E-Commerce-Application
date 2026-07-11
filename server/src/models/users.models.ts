import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar?: {
    url: string;
    publicId: string;
  };

  role: UserRole;

  comparePassword(password: string): Promise<boolean>;
}

export type UserRole = "user" | "admin";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    avatar: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/demo/image/upload/default-profile.png",
      },

      publicId: {
        type: String,
      },
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },

  {
    timestamps: true,
  },
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

// Compare password during login
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
