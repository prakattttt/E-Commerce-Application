import mongoose, { Schema, Types } from "mongoose";

/* Payment Method */

export type PaymentMethod = "eSewa" | "Khalti";

/* Payment Status */

export type PaymentStatus = "Pending" | "Paid";

/* Order Status */

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

/* Single Product inside an Order */

export interface IOrderItem {
  /* Reference to original product */
  product: Types.ObjectId;

  /* Snapshot of product information */
  name: string;
  image: string;
  price: number;

  /* Quantity ordered */
  quantity: number;
}

/* Shipping Address */

export interface IShippingAddress {
  fullName: string;
  phone: string;

  address: string;
  city: string;

  country: string;
}

/* Order */

export interface IOrder {
  _id: Types.ObjectId;

  /* User who placed the order */
  user: Types.ObjectId;

  /* Purchased products */
  items: IOrderItem[];

  /* Price Summary */
  subtotal: number;
  shippingCost: number;
  total: number;

  /* Delivery Information */
  shippingAddress: IShippingAddress;

  /* Payment */
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  /* Delivery Progress */
  orderStatus: OrderStatus;

  createdAt: Date;
  updatedAt: Date;
}

/* ---------------- Order Item ---------------- */

const orderItemSchema = new Schema<IOrderItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    /* Stored as snapshot */
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  },
);

/* ---------------- Shipping Address ---------------- */

const shippingAddressSchema = new Schema<IShippingAddress>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

/* ---------------- Order ---------------- */

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    shippingCost: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["eSewa", "Khalti"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

/* Indexes */

orderSchema.index({
  user: 1,
  createdAt: -1,
});

export const Order = mongoose.model<IOrder>("Order", orderSchema);