import mongoose from "mongoose";
import express from "express";
import { Addreview } from "../controllers/ReviewController.js";
import authMiddleware from "../middleware/Auth.middleware.js";



const router = express.Router();


router.post("/AddReview" , authMiddleware ,  Addreview )

export default router;