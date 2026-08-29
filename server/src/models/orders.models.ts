import mongoose, { Schema, Types } from "mongoose";

export type PaymentMethod = "COD" | "eSewa" | "Khalti";

export type PaymentStatus = "Pending" | "Paid";

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface IOrderItem {
  product: Types.ObjectId;

  name: string;
  image: string;
  price: number;

  quantity: number;
}

export interface IShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
}

export interface IOrder {
  _id: Types.ObjectId;

  orderNumber: string;

  user: Types.ObjectId;

  items: IOrderItem[];

  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;

  shippingAddress: IShippingAddress;

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  orderStatus: OrderStatus;

  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
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

    province: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items: IOrderItem[]) => items.length > 0,
        message: "Order must contain at least one item",
      },
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    shippingCost: {
      type: Number,
      required: true,
      min: 0,
    },

    tax: {
      type: Number,
      required: true,
      min: 0,
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
      enum: ["COD", "eSewa", "Khalti"],
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

orderSchema.index({
  user: 1,
  createdAt: -1,
});

export const Order = mongoose.model<IOrder>("Order", orderSchema);