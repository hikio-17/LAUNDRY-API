const express = require('express');
const { authCheck, adminCheck } = require('../middleware/auth');
const { addProductHandler } = require('../controllers/productController');

const router = express.Router();

router.post('/products', authCheck, adminCheck, addProductHandler);

module.exports = router;