import mongoose, { mongo } from "mongoose";

const CourseSchema = new mongoose.Schema({
  CourseName: { type: String, required: true },
  Courseduration: { type: Number, required: true },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], 
});

export const CourseModel = mongoose.model("Course", CourseSchema);
