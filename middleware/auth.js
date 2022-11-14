const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/ErrorResponse');
const Author = require('../models/Author');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if(
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  // else if(req.cookies.token){
  //   console.log(req.cookies.token)
  //   token = req.cookies.token
  // }
  if(!token){
    return next(new ErrorResponse('Not authorize to access this route', 401));

  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.author = await Author.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
    
  }
});