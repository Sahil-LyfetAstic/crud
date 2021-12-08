//create and save token in cookies
export const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  console.log(token)

  console.log(Date.now)
  const option = {
    expires:new Date(   
      Date.now()+process.env.COOKIE_EXPIRES_TIME *60*60*24
      //*24*60*60*1000
  ),  
  httpOnly:true
  };


  res.status(statusCode).cookie("token", token, option).json({
    success: true,
    token,
    user,
  });
};
