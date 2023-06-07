const express = require('express');
const { authCheck, adminCheck } = require('../middleware/auth');
const { getAllOrderHandler, getOrderByIdHandler, deleteOrderByIdHandler, updateStatusOrderHandler } = require('../controllers/orderController');
const { validateUpdateStatus } = require('../validators/validateUpdateStatus');

const router = express.Router();

router.get('/orders', authCheck, getAllOrderHandler);
router.get('/orders/:orderId', authCheck, getOrderByIdHandler);
router.put('/orders/:orderId', validateUpdateStatus, authCheck, adminCheck, updateStatusOrderHandler);
router.delete('/orders/:orderId', authCheck, deleteOrderByIdHandler);

module.exports = router;