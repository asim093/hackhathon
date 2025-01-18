import { OrderModel } from "../Models/Order.model.js";
import { Usermodle } from "../Models/User.model.js";
import { productmodel } from "../Models/Product.model.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51QhkNeRTTxMNN0bCIDXjxyfs3GeQRSrP16hBdjUdDoKxg3SPASbOMwkF9ZUKTrAQCejotQw1anpafZr8uh6Q2KAc00CjkTMsfk"
);
export const Createorder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    if (!userId || !products || !products.length) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    let totalAmount = 0;
    const productsdata = await Promise.all(
      products.map(async (item) => {
        const product = await productmodel.findById(item.product).exec();
        if (!product) {
          throw new Error(`Product not found: ${item.product}`);
        }
        if (!product.name || !product.price || !product.image) {
          throw new Error(
            `Product is missing required fields: ${item.product}`
          );
        }

        totalAmount += product.price * (item.quantity || 1);
        return {
          ...product._doc,
          quantity: item.quantity || 1,
        };
      })
    );

    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    try {
      // Create the order in MongoDB
      const newOrder = new OrderModel({
        user: userId,
        products: productsdata.map((p) => ({
          product: p._id,
          quantity: p.quantity,
        })),
        totalAmount,
      });
      const savedOrder = await newOrder.save({ session: mongoSession });

      // Update user with the new order
      await Usermodle.findByIdAndUpdate(
        userId,
        { $push: { order: savedOrder._id } },
        { session: mongoSession }
      );

      await mongoSession.commitTransaction();
      mongoSession.endSession();

      // Create Stripe session
      const lineItems = productsdata.map((p) => ({
        price_data: {
          currency: "PKR",
          product_data: {
            name: p.name,
            images: [p.image],
          },
          unit_amount: Math.round(p.price * 100),
        },
        quantity: p.quantity,
      }));

      const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/Success",
        cancel_url: "http://localhost:5173/Cancel",
      });

      console.log(stripeSession.id); 

      res.status(201).json({
        message: "Order created successfully",
        order: savedOrder,
        sessionId: stripeSession.id,
      });
    } catch (err) {
      await mongoSession.abortTransaction();
      mongoSession.endSession();
      throw err;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message || "Server error" });
  }
};

export const getorders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("user", "username email")
      .populate("products.product", "name price");
    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getsingleorder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id)
      .populate("user", "username email")
      .populate("products.product", "name price");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order fetched successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


