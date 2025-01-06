import express from "express";
import { StudentModel } from "../Models/Student.model.js";
import { CourseModel } from "../Models/Course.model.js";

export const AddStudent = async (req, res) => {
  try {
    const { name, age, enrolledCourse } = req.body;

    if (!name || !age || !enrolledCourse) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingStudent = await StudentModel.findOne({ name });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const course = await CourseModel.findById(enrolledCourse);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newStudent = new StudentModel({ name, age, enrolledCourse });
    await newStudent.save();

    course.enrolledStudents.push(newStudent._id);
    await course.save();

    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Server Error" });
  }
};


export const GetAllstudent = async (req ,res) => {
    try {
        const students = await StudentModel.find({});
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }   
}