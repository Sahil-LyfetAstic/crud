import catchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "../utlis/errorHandler.js";
import jwt from "jsonwebtoken";
import user from "../models/userModel.js";

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  // if (!token) return next(ErrorHandler("Login to Access Resources", 401));
  if(!token) {
    return next()
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);

  req.user = await user.findById(decoded.id)
  console.log(req.user)

  next()
});
