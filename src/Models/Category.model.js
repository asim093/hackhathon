import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
})

export const Categorymodel = mongoose.model("Category", CategorySchema);