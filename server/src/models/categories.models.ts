import mongoose, { Schema, Types } from "mongoose";
import slugify from "slugify";

import { imageSchema, type IImage } from "./schemas/image.schemas.js";

export interface ICategory {
  _id: Types.ObjectId;

  name: string;

  slug: string;

  image?: IImage;

  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    image: {
      type: imageSchema,
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.pre("validate", function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
});

export const Category = mongoose.model<ICategory>(
  "Category",
  categorySchema,
);