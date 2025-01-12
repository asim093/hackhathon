import express from "express";
import {
  forgotPassword,
  Login,
  resetPassword,
  Signup,
  verifyOtp,
  getAllUser,
} from "../controllers/Usercontroller.js";
import upload from "../middleware/Multer.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /auth/Signup:
 *    post:
 *     summary: User registration
 *     description: Registers a new user with username, email, password, and profile image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               profileimage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request
 */
router.post("/Signup", upload.single("profileimage"), Signup);

/**
 * @swagger
 * /auth/Login:
 *   post:
 *     summary: User login
 *     description: Logs a user in with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Unauthorized, invalid credentials
 */
router.post("/Login", Login);

/**
 * @swagger
 * /auth/forgotpassword:
 *   post:
 *     summary: Forgot password
 *     description: Sends an OTP to the user's email for password recovery
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent to email
 *       404:
 *         description: Email not found
 */
router.post("/forgotpassword", forgotPassword);

/**
 * @swagger
 * /auth/verifyotp:
 *   post:
 *     summary: Verify OTP
 *     description: Verifies the OTP sent to the user's email for password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               otp:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 */
router.post("/verifyotp", verifyOtp);

/**
 * @swagger
 * /auth/resetpassword:
 *   post:
 *     summary: Reset password
 *     description: Resets the user's password after OTP verification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid request
 */
router.post("/resetpassword", resetPassword);

/**
 * @swagger
 * /auth/allusers:
 *   get:
 *     summary: Get all users
 *     description: Fetches a list of all registered users
 *     responses:
 *       200:
 *         description: List of all users
 *       500:
 *         description: Internal server error
 */
router.get("/allusers", getAllUser);

export default router;
