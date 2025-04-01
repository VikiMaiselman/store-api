import Product from "../models/product.js";

export const getAllProducts = async (req, res) => {
  // throw new Error("Error in getAllProducts");
  // because of use of express-async-errors, we don't need to use try-catch block or call next

  const queryObj = createQueryObj(req.query);
  const sortObj = createSortObj(req.query);

  const products = await Product.find(queryObj).sort(sortObj);
  res.status(200).json({ status: "success", products, nbhits: products.length });
};

export const getSingleProduct = async (req, res) => {};
export const createProduct = async (req, res) => {};
export const updateProduct = async (req, res) => {};
export const deleteProduct = async (req, res) => {};

/* helpers */
function createQueryObj(query) {
  const { featured, company, name } = query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === "true";
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }

  return queryObj;
}

function createSortObj(query) {
  const { sort } = query;
  const sortList = sort?.split(",");

  const sortObj = {};
  sortList?.forEach((element) => {
    if (element.startsWith("-")) sortObj[element.replace("-", "")] = -1;
    else sortObj[element] = 1;
  });

  return sortObj;
}
