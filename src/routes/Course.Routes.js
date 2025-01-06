import express from "express";
import { AddCourse, AllCourse } from "../controllers/CourseController.js";

const router = express.Router();

router.post("/AddCourse" , AddCourse);
router.get("/AllCourse" , AllCourse);
export default router;
