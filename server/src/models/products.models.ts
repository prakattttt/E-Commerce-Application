import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

export interface IProductImage {
  url: string;
  publicId: string;
}

export interface IProduct {
  name: string;
  slug: string;

  description: string;

  price: number;
  originalPrice?: number;

  stock: number;

  brand: string;

  category: string;

  imageCover: IProductImage;

  images: IProductImage[];

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductDTO {
  name: string;
  description: string;

  price: number;
  originalPrice?: number;

  stock: number;

  brand: string;

  category: string;
}

const imageSchema = new Schema<IProductImage>(
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

/* Schems for products */
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
      type: String,
      // ref: "Category",
      required: true,
    },

    imageCover: {
      type: imageSchema,
      // required: true,
    },

    images: {
      type: [imageSchema],
      default: [],
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
