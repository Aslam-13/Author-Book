const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const {  randFullName,  randPassword } = require('@ngneat/falso'); 


dotenv.config({ path: './config/config.env'});

const Author = require('./models/Author');
const Book = require('./models/Book'); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

 
const importData = async () => {
  try {
    for(let i=0; i<10; i++){
      const author = {  
     name: randFullName(), 
     email: `first${i}@gmail.com`,
     password: randPassword(), 
    } 
    await Author.create(author);  
    }  
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
} 

importData();