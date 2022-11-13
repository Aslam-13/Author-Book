const mongoose = require("mongoose");
const BookSchema = new  mongoose.Schema( { 
   title: {
    type: String, 
    required: [true, 'Please add a title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  likes:{
    type: Array,
    default: [],
  }, 
  authorId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Author',
    required: true
  }, 
  createdAt: {
    type: Date,
    default: Date.now
  },
 }, 
);
module.exports = mongoose.model("Book", BookSchema);