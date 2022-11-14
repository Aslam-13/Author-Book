const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const colors = require('colors');
const path = require('path'); 
const cookieParser = require('cookie-parser');



//route files
const auth = require('./routes/auth'); 
const book = require('./routes/book')
const author = require('./routes/author');
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

app.use('/api/v1/auth', auth);  
app.use('/api/v1/book', book);
app.use('/api/v1/author', author);
// Errors middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// server
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);