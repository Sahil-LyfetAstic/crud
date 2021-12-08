import ErrorHandler from "../utlis/errorHandler.js";

export const error = (err, req, res, next) => {
    console.log(err)
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

//   if(process.env.NODE_ENV === 'DEVELOPMENT'){
//       res.status(err.statusCode).json({
//           success:false,
//           error:err,
//           errMessage:err.message,
//           stack:err.stack
//       })
//   }

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    let error = { ...err };
    console.log(error);
    error.message = err.message;
    console.log(err.name);

    //Wrong mongoose  Object id error
    if (err.name === "CastError") {
      const message = `Resourse not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    //Hangling mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((values) => values.message);
      error = new ErrorHandler(message, 400);
    }

    //Handling mongoose duplicate key error
    if (err.code === 11000) {
      console.log(err.keyValue);
      if (err.keyPattern.email === 1) {
        const message = `User with ${Object.keys(err.keyValue)} already exist`;
        error = new ErrorHandler(message, 400);
      } else {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        error = new ErrorHandler(message, 400);
      }
    }

    //Handling wrong jwt error
    if (err.name === "JsonWebTokenError") {
      const message = `JSON web token is invalid . Try again`;
      error = new ErrorHandler(message, 400);
    }

    //Handling expired jwt error
    if (err.name === "TokenExpiredError") {
      const message = `JSON web token is expired . Try again`;
      error = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal Server error",
    });
  }
};
export default error;
