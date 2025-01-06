import mongoose, { mongo } from "mongoose";
import { CourseModel } from "./Course.model.js";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price:{type:Number , required:true},
  image:{type:String , required:true},
  userid:{type:mongoose.Schema.Types.ObjectId , ref : "User"},
  orderItems : [{type:mongoose.Schema.Types.ObjectId , ref:"Order"}]
});

export const productmodel = mongoose.model("Product", ProductSchema);
