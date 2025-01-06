import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "pending", enum: ["pending", "completed", "canceled"] },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Order", OrderSchema);
