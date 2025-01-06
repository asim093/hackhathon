import express from "express";
import { Createorder, getorders, getsingleorder } from "../controllers/OrderController.js";
import authMiddleware from "../middleware/Auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /order/createorder:
 *   post:
 *     summary: Create a new order
 *     security:
 *       - bearerAuth: [] # Add auth if required
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user who is placing the order
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: Product ID
 *                     quantity:
 *                       type: integer
 *                       description: Quantity of the product
 *               totalAmount:
 *                 type: number
 *                 description: Total price of the order
 *               status:
 *                 type: string
 *                 enum: ["pending", "completed", "canceled"]
 *                 description: Current status of the order
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post("/createorder", authMiddleware, Createorder);

/**
 * @swagger
 * /order/getorders:
 *   get:
 *     summary: Get all orders
 *     security:
 *       - bearerAuth: [] # Add auth if required
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Order"
 */
router.get("/getorders", authMiddleware, getorders);

/**
 * @swagger
 * /order/getsingleorder/{id}:
 *   get:
 *     summary: Get single order by ID
 *     security:
 *       - bearerAuth: [] # Add auth if required
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 *       404:
 *         description: Order not found
 */
router.get("/getsingleorder/:id", authMiddleware, getsingleorder);

export default router;
