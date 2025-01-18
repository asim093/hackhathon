import express from "express";
import { ReviewModel } from "../Models/Review.model.js";
import { productmodel } from "../Models/Product.model.js";

export const Addreview = async (req, res) => {
  try {
    const { productid, text, userid } = req.body;

    if (!productid || !text || !userid) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the review
    const review = await ReviewModel.create({
      productid,
      text,
      userid,
    });

    const product = await productmodel.findById(productid);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.reviews.push(review._id);
    await product.save();

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
