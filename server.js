const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const path = require('path'); 
const cookieParser = require('cookie-parser');




// config
dotenv.config({path: './config/config.env'});


// connect to db
connectDB();

const app = express();


// json content
app.use(express.json());
app.use(cookieParser());



// for rest api's
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}
// for static assets
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API service running 🚀',
  });
});

const PORT = process.env.PORT || 5000;

// server
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);