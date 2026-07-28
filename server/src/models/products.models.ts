import mongoose, { Schema, Types } from "mongoose";
import slugify from "slugify";

import { imageSchema, type IImage } from "./schemas/image.schemas.js";

export interface IProduct {
  _id: Types.ObjectId;

  name: string;
  slug: string;

  description: string;

  price: number;
  originalPrice: number;

  stock: number;

  brand: string;

  category: mongoose.Types.ObjectId;

  imageCover: IImage;

  images: IImage[];

  rating: number;
  reviews: number;

  badge?: string;

  featured: boolean;
  flashSale: boolean;

  createdAt: Date;
  updatedAt: Date;
}

/* Schemqs for products */
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    originalPrice: {
      type: Number,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    imageCover: {
      type: imageSchema,
      required: true,
    },

    images: {
      type: [imageSchema],
      default: [],
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    badge: {
      type: String,
      trim: true,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    flashSale: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

/* Indexes */
productSchema.index({
  name: "text",
  description: "text",
  brand: "text",
});

/* Middleware */
productSchema.pre("validate", function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
