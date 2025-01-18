import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    productid: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    text: { type: String, required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const ReviewModel = mongoose.model("review", ReviewSchema);
