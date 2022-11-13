const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
       /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
       'Please add a valid email'
    ]
 }, 
 password: {
   type: String,
   required: [true, 'Please add a password'],
   minlength: 6,
   select: false
  },  
 phone: {
   type: Number, 
   minlength: 10,
   maxlength: 10,
   select: false
  },  
 createdAt: {
  type: Date,
  default: Date.now
 } 
});


module.exports = mongoose.model('Author', AuthorSchema);

