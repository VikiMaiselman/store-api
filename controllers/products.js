import Product from "../models/product.js";

export const getAllProducts = async (req, res) => {
  // throw new Error("Error in getAllProducts");
  // because of use of express-async-errors, we don't need to use try-catch block or call next
  const allProducts = await Product.find({});
  res.status(200).json({ status: "success", products: allProducts });
};

export const getSingleProduct = async (req, res) => {};
export const createProduct = async (req, res) => {};
export const updateProduct = async (req, res) => {};
export const deleteProduct = async (req, res) => {};
