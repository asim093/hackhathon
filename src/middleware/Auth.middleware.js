import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded.user;

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Token is not valid", status: "failed" });
  }
};


// const adminmiddleware = async (req , res , next) => {
//   if (!req.user?.role === 'admin') {
//     return res
//      .status(403)
//      .json({ message: "You are not authorized to perform this action", status: "failed" });
//   }
//   next();
  
// }



export default authMiddleware;
