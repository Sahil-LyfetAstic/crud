import catchAsyncError from "../middlewares/catchAsyncError.js";
import product from "../models/productModel.js";
import ErrorHandler from "../utlis/errorHandler.js";
const admin = true;

export const addProduct = (req, res, next) => {
  res.render("admin/add-product", { admin });
};

export const newProduct = catchAsyncError(async (req, res, next) => {
  const Product = await product.create(req.body);

  res.status(201).json({
    success: true,
    Product,
  });
});

export const viewProduct = catchAsyncError(async (req, res, next) => {
  const Products = await product.find();
  if (!Products) next(ErrorHandler("There is no product to Display", 404));
  res.status(200).json({
    success: true,
    Products,
  });
});
