import userModel from "../models/userModel.js";
import ErrorHandler from "../utlis/errorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import { sendToken } from "../utlis/jwtToken.js";
const user = true;

export const getSignUp = (req, res, next) => {
  res.render("user/register", { user });
};

export const signUp = catchAsyncError(async (req, res, next) => {
  const User = await userModel.create(req.body);

  sendToken(User, 200, res);
});

export const getHome = catchAsyncError(async (req, res, next) => {
  if (req.user) {
    let userLog = {
      name: req.user.name,
      id: req.user._id,
    };
    await res.render("user/home", { user, userLog });
  }

  await res.render("user/home", { user });
  
});

export const getLogin = catchAsyncError(async (req, res, next) => {
   res.render('user/login')
});
export const login = catchAsyncError(async (req, res, next) => {
    const {email,password} = req.body

    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password',400))
    }

    //find user 
    const userData = userModel.findOne({email}).select("+password")
    console.log(userData)

    //no user
    if(!userData){
        return next(new ErrorHandler('Invalid Email or password',401))
    }

    const isMatchedPassword = await userData.comparePassword(password)

});

export const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
