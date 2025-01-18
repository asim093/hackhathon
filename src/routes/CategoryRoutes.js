import express from "express";
import { Addcategory, getcategory, Getsinglecategory } from "../controllers/CategoryController.js";

const router = express.Router();

router.post("/Addcategory" , Addcategory)
router.get("/getcategory" , getcategory);
router.get("/getsinglecategory/:categoryid" , Getsinglecategory);

export default router;