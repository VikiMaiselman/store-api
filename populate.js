// Populating the database with sample json data as a batch
import { config } from "dotenv";
import { connectDB } from "./db/connect.js";
import Product from "./models/product.js";
import products from "./products.json" with { type: "json" };

config(); // load environment variables from .env file

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany(); // delete all products to Px duplicate data
    await Product.create(products); // create new products
    console.log("Success! Data is populated");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};
start();
