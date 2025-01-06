import mongoose from "mongoose";
import { CourseModel } from "./Course.model.js";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  enrolledCourse: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
});

export const StudentModel = mongoose.model("Student", StudentSchema);
