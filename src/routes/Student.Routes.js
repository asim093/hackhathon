import express from "express";
import { AddStudent, GetAllstudent } from "../controllers/StudentController.js";

const router = express.Router();

router.post('/AddStudent' , AddStudent )
router.get('/AllStudent' , GetAllstudent)




export default router;