const express = require('express');
const { authCheck } = require('../middleware/auth');
const { getAllOrderHandler, getOrderByIdHandler, deleteOrderByIdHandler } = require('../controllers/orderController');

const router = express.Router();

router.get('/orders', authCheck, getAllOrderHandler);
router.get('/orders/:orderId', authCheck, getOrderByIdHandler);
router.delete('/orders/:orderId', authCheck, deleteOrderByIdHandler);

module.exports = router;