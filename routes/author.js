const express = require('express');
const { getAuthors, getAuthor, getMe} = require('../controllers/author');
const { protect } = require('../middleware/auth');


const router = express.Router();

router.get('/getall',protect,  getAuthors);   
router.get('/getsingle/:id',protect,  getAuthor);   
router.get('/getme',protect,  getMe);    


module.exports = router;