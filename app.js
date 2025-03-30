import express from "express";
import { config } from "dotenv";
import "express-async-errors"; // to handle async errors, no need to write try-catch in every controller any more

import { connectDB } from "./db/connect.js";
import productsRouter from "./routes/products.js";
import { notFound } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";

const app = express();
const PORT = process.env.PORT || 3000;
config();

// middleware
app.use(express.json());

// routes
app.use("/api/v1/products", productsRouter);
app.use("*", notFound);

// more middleware
app.use(errorHandlerMiddleware);

const startApp = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, (req, res) => {
      console.log(`Server is up and listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};
startApp();
