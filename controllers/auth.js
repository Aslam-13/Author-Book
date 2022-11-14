const Author = require('../models/Author');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async'); 



exports.register = asyncHandler(async (req, res, next)=>{
  const {name, email, password } = req.body; 
  const author = await Author.create({
    name,
    email,
    password 
  });  
  sendTokenResponse(author, 200, res);  
})


exports.login = asyncHandler(async (req, res, next)=>{
  const {name, email, password } = req.body;  
 if(!email || !password){
  return next(new ErrorResponse('Please provide an email and password', 400) ); 
 }
 const author = await Author.findOne({email}).select('+password');
 if(!author){
  return next(new ErrorResponse ('Invalid credentials', 401))
 } 
 const isMatch = await author.matchPassword(password);
 if(!isMatch){
  return next(new ErrorResponse ('Invalid credentials', 401)) 
 }
 sendTokenResponse(author, 200, res);
}); 


const sendTokenResponse = (author, statusCode, res)=>{
  const token = author.getSignedJwtToken();
  const options = {
    expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE *24*60*60*1000),
    httpOnly: true
  };
  if(process.env.NODE_ENV==='production'){
    options.secure = true
  }
  res
  .status(statusCode)
  .cookie('token', token, options)
  .json({
    success: true,
    token 
  }) 
}
