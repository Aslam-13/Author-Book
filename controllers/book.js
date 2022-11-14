const Book = require('../models/Book');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async'); 
const Author = require('../models/Author');

exports.createBook = asyncHandler(async (req, res, next)=>{
  req.body.authorId = req.author.id;
  const book = await Book.create(req.body);
  const author = await Author.findById(req.author.id);   
  await author.updateOne({ $push: { book:book._id} }); 
  res.status(200).json({
    success: true,
    data: book
  })
})
exports.updateBook =  asyncHandler(async (req, res, next) => { 
  let book = await Book.findById(req.params.id );
  if(!book){
    return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
  }
  if(book.authorId.toString()!== req.author.id ){
    return next(new ErrorResponse(`Author ${req.params.id} is not authorized to update this book`, 401))

  }
  book = await Book.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
     success: true,
      data: book}); 
});
exports.getBooks =  asyncHandler(async (req, res, next) => {    
  let book = await Book.find().sort({ createdAt: -1 })
  if(!book){
    return next(new ErrorResponse(`Books not available`, 404));
  }
  
  res.status(200).json({
     success: true,
      data: book}); 
});
exports.deleteBook = asyncHandler(async (req, res, next)=>{ 
  const book = await Book.findById(req.params.id);
  if(!book){
    return next(
      new ErrorResponse(`No book with the id of ${req.params.id}`),
      404
    );
   } 
   if(book.authorId.toString()!== req.author.id ){
    return next(new ErrorResponse(`Author ${req.user.id} is not authorized to delete book${book._id}`, 401)) 
  }
  const author = await Author.findById(req.author.id);   
  await author.updateOne({ $pull: { book:book._id} }); 
   await book.remove();
    res.status(200).json({
      success: true, 
      data:  {}
    }); 
})
 
  exports.like = asyncHandler(async(req, res, next)=>{ 
    const book = await Book.findById(req.params.id);  
     if (!book.likes.includes(req.author.id)) {
      await book.updateOne({ $push: { likes: req.author.id } }); 
      res.status(200).json({
        success: true,
        message: "Book has been liked"
      });
    } else {
      return next(new ErrorResponse('You are already liked this book', 403));
    }
  })

  exports.unlike = asyncHandler(async(req, res, next)=>{ 
    const book = await Book.findById(req.params.id);  
     if (book.likes.includes(req.author.id)) {
      await book.updateOne({ $pull: { likes: req.author.id } }); 
      res.status(200).json({
        success: true,
        message: "Book has been unliked"
      });
    } else {
      return next(new ErrorResponse('You are not allowed to unlike again', 403));
    }
  })
 