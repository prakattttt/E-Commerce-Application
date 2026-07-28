import { Schema } from "mongoose";

export interface IImage {
  url: string;
  publicId: string;
}

export const imageSchema = new Schema<IImage>(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);