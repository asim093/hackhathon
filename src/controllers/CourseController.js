import express from "express";
import { CourseModel } from "../Models/Course.model.js";

export const AddCourse = async (req, res) => {
  try {
    const { CourseName, Courseduration } = req.body;
    if (!CourseName || !Courseduration) {
      return res
        .status(400)
        .json({ error: "CourseName and Courseduration are required" });
    }

    const Course = await CourseModel.findOne({ CourseName });

    if (Course) {
      res.status(400).json({ message: "Course Already Exsists" });
      return;
    }

    const newCourse = new CourseModel({ CourseName, Courseduration });
    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course Added Successfully", course: newCourse });
  } catch {
    res.status(500).json({ error: "Server Error" });
  }
};


export const AllCourse = async (req , res) => {
    try{
        const courses = await CourseModel.find().populate("enrolledStudents");
        res.status(200).json(courses);
    }catch{
        res.status(500).json({error: "Server Error"});
    }
}