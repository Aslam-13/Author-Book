const Book = require('../models/Book');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async'); 
const Author = require('../models/Author');


exports.getAuthors =  asyncHandler(async (req, res, next) => {    
  let authors = await Author.find().sort({ createdAt: -1 })
  if(!authors){
    return next(new ErrorResponse(`Authors not available`, 404));
  }
  
  res.status(200).json({
     success: true,
      data: authors}); 
});
exports.getAuthor =  asyncHandler(async (req, res, next) => {    
  let author = await Author.findById(req.params.id );
  if(!author){
    return next(new ErrorResponse(`Author not found with id of ${req.params.id}`, 404));
  } 
  res.status(200).json({
     success: true,
     Books: author.book.length,
      data: author}); 
});
exports.getMe =  asyncHandler(async (req, res, next) => {    
  let author = await Author.findById(req.author.id );
  if(!author){
    return next(new ErrorResponse(`Author not found with id of ${req.author.id}`, 404));
  }
  if(author._id.toString()!== req.author.id ){
    return next(new ErrorResponse(`You are not allowed to get this author`, 401))

  }
  
  res.status(200).json({
     success: true,
     Books: author.book.length,
      data: author}); 
});