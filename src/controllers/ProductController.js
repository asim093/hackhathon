import { Categorymodel } from "../Models/Category.model.js";
import { productmodel } from "../Models/Product.model.js";
import { Usermodle } from "../Models/User.model.js";

export const CreateProduct = async (req, res) => {
  try {
    const { name, description, price, userid, Categoryname } = req.body;

    if (!name || !description || !price || !userid || !Categoryname) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }

    const category = await Categorymodel.name.findOne({ name: Categoryname });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const user = await Usermodle.findById(userid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = new productmodel({
      name,
      description,
      price,
      image: req.file.path,
      userid,
      category: category._id,
    });

    await product.save();

    category.products.push(product._id);
    await category.save();

    user.products.push(product._id);
    await user.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error in CreateProduct:", error.message);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

export const getSingleproduct = async (req, res) => {
  try {
    const product = await productmodel
      .findById(req.params.id)
      .populate("reviews");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product found", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getAllproduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page <= 0 || limit <= 0) {
      return res.status(400).json({ error: "Invalid page or limit value" });
    }

    const skip = (page - 1) * limit;

    const total = await productmodel.countDocuments({});
    const products = await productmodel
      .find({})
      .skip(skip)
      .limit(limit)
      .populate("reviews").populate("userid" , "name" , "profileimage")
      .populate("category", "name")
      .exec();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json({
      message: "Products fetched successfully",
      data: products,
      length: products.length,
      total,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const product = await productmodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productmodel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
