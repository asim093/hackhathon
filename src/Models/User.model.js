import mongoose from "mongoose";

const Userschema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, default: "" },
    profileimage: { type: String, default: "", required: true },
    otp: {
      value: { type: String },
      expireAt: { type: Date },
      verified: { type: Boolean, default: "false" },
    },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

export const Usermodle = mongoose.model("User", Userschema);
