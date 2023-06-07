const express = require('express');
const { authCheck, adminCheck } = require('../middleware/auth');
const { addProductHandler, getAllProductHandler, getProductByIdHandler, updateProductByIdHandler, deleteProductByIdHandler } = require('../controllers/productController');
const { addOrderHandler } = require('../controllers/orderController');

const router = express.Router();

router.get('/products', getAllProductHandler);
router.get('/products/:id', getProductByIdHandler);
router.post('/products', authCheck, adminCheck, addProductHandler);
router.put('/products/:id', authCheck, adminCheck, updateProductByIdHandler);
router.delete('/products/:id', authCheck, adminCheck, deleteProductByIdHandler);

// Order
router.post('/products/:productId/orders', authCheck, addOrderHandler);

module.exports = router;