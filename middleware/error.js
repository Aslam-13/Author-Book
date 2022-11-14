const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next)=>{
let error = {...err};
error.message = err.message;

  console.log(err.stack.red);
  // Mongodb bad objectId
  if(err.name === 'CastError'){
    const message = `BOok not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  // Mongodb error, duplicate field entered already there in database
  if(err.code === 11000){
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }
  // Mongodb validation error, values not entered properly
  if(err.name === 'ValidationError'){
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;