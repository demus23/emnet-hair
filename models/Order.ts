import mongoose, { Schema, models } from "mongoose";

const OrderItemSchema = new Schema(
  {
    productId: String,
    name: String,
    image: String,
    price: Number,
    quantity: Number,
  },
  { _id: false }
);

const ShippingSchema = new Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    notes: String,
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    userEmail: String,
    customerEmail: String,
    customerName: String,
    shipping: ShippingSchema,
    items: [OrderItemSchema],
    totalAmount: Number,
    currency: { type: String, default: "aed" },
    status: {
      type: String,
      enum: ["paid", "processing", "shipped", "delivered", "cancelled"],
      default: "paid",
    },
    stripeSessionId: { type: String, unique: true },
    stripePaymentIntentId: String,
  },
  { timestamps: true }
);

export default models.Order || mongoose.model("Order", OrderSchema);