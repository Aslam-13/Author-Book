const express = require('express');
const {createBook, getBooks, deleteBook, like, unlike, updateBook } = require('../controllers/book');
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');
const Book = require('../models/Book')


const router = express.Router();

router.post('/',protect,  createBook);   
router.route('/').get(protect, advancedResults(Book ), getBooks) 
router.put('/:id',protect,  updateBook);   
router.delete('/:id',protect,  deleteBook);    
router.put('/like/:id', protect, like)
router.put('/unlike/:id', protect, unlike) 


module.exports = router;