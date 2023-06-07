const express = require('express');
const { authCheck, adminCheck } = require('../middleware/auth');
const { addProductHandler, getAllProductHandler, getProductByIdHandler, updateProductByIdHandler, deleteProductByIdHandler } = require('../controllers/productController');
const { addOrderHandler } = require('../controllers/orderController');
const { validateOrder } = require('../validators/orderValidate');
const { validateProduct } = require('../validators/productValidate');

const router = express.Router();

router.get('/products', authCheck, getAllProductHandler);
router.get('/products/:id', authCheck, getProductByIdHandler);
router.post('/products', validateProduct, authCheck, adminCheck, addProductHandler);
router.put('/products/:id', authCheck, adminCheck, updateProductByIdHandler);
router.delete('/products/:id', authCheck, adminCheck, deleteProductByIdHandler);

// Order
router.post('/products/:productId/orders', validateOrder, authCheck, addOrderHandler);

module.exports = router;