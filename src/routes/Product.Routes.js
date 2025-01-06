import express from "express";
import {
  CreateProduct,
  deleteProduct,
  getAllproduct,
  getSingleproduct,
  updateProduct,
} from "../controllers/ProductController.js";
import upload from "../middleware/Multer.middleware.js";
import authMiddleware from "../middleware/Auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /product/createproduct:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []  # Token ki zarurat yahan specify ki gayi hai
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               userid:
 *                 type: string
 *                 description: ID of the user who is creating the product (This will be fetched automatically from the token)
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized - Invalid token or missing token
 */
router.post(
  "/createproduct",
  upload.single("image"),
  authMiddleware,
  CreateProduct
);

/**
 * @swagger
 * /product/getproduct:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 */
router.get("/getproduct", getAllproduct);

/**
 * @swagger
 * /product/getsingleproduct/{id}:
 *   get:
 *     summary: Get single product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 *       404:
 *         description: Product not found
 */
router.get("/getsingleproduct/:id", getSingleproduct);

export default router;
