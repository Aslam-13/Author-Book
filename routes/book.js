const express = require('express');
const {createBook, getBooks, deleteBook, like, unlike, updateBook } = require('../controllers/book');
const { protect } = require('../middleware/auth');


const router = express.Router();

router.post('/',protect,  createBook);   
router.get('/',protect,  getBooks);   
router.put('/:id',protect,  updateBook);   
router.delete('/:id',protect,  deleteBook);    
router.put('/like/:id', protect, like)
router.put('/unlike/:id', protect, unlike) 


module.exports = router;