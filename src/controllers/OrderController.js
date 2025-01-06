import { OrderModel } from "../Models/Order.model.js";
import { Usermodle } from "../Models/User.model.js";
import { productmodel } from "../Models/Product.model.js";

export const Createorder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    if (!userId || !products || !products.length) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    let totalAmount = 0;
    for (const item of products) {
      const product = await productmodel.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ error: `Product not found: ${item.product}` });
      }
      totalAmount += product.price * item.quantity;
    }

    const order = new OrderModel({
      user: userId,
      products,
      totalAmount,
    });

    const savedOrder = await order.save();

    const user = await Usermodle.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.order.push(savedOrder._id);
    await user.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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
