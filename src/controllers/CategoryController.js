import express from "express";
import { Categorymodel } from "../Models/Category.model.js";

export const Addcategory = async (req, res) => {
  try {
    const { categoryname } = req.body;

    if (!categoryname) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existingCategory = await Categorymodel.findOne({
      name: categoryname,
    });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Categorymodel({ name: categoryname });
    await category.save();

    res.status(201).json({ message: "Category added successfully", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getcategory = async (req, res) => {
  try {
    const categories = await Categorymodel.find({}).populate("products");
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const Getsinglecategory = async (req, res) => {
  const { categoryid } = req.params;
  try {
    const category = await Categorymodel.findById(categoryid).populate(
      "products"
    );
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
