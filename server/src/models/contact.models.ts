import mongoose, { Schema } from "mongoose";

export interface IContact {
  name: string;
  email: string;
  subject: "order" | "product" | "payment" | "account" | "other";
  message: string;
  status: "unread" | "read" | "resolved";
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    subject: {
      type: String,
      enum: ["order", "product", "payment", "account", "other"],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["unread", "read", "resolved"],
      default: "unread",
    },
  },
  {
    timestamps: true,
  },
);

export const Contact = mongoose.model<IContact>("Contact", contactSchema);
