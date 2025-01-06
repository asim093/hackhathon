import express from "express";
import dotenv from "dotenv";
import userroutes from "./src/routes/UserRoutes.js";
import courseroutes from "./src/routes/Course.Routes.js";
import studentroutes from "./src/routes/Student.Routes.js";
import productroutes from "./src/routes/Product.Routes.js";
import orderroutes from "./src/routes/Order.Routes.js";
import connectDb from "./src/db/index.js";
import cors from "cors";

// Swagger imports
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: '*',  
    credentials: false,  
  })
);

app.use(express.json());
// server.js mein
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Ecommerce API!" });
});


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", userroutes);
app.use("/product", productroutes);
app.use("/order", orderroutes);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });
