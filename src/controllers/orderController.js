const asyncHandler = require('express-async-handler');
const { addOrder, findAllOrder, verifyOrderAccess, findOrderById, deleteOrderById, updateStatusOrder } = require('../services/orderService');

const addOrderHandler = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { id: userId } = req.user;
  const { amount } = req.body;

  const order = await addOrder(amount, productId, userId);

  res.status(201).json({
    status: 'success',
    message: 'Order berhasil dibuat',
    data: {
      order,
    },
  });
});

const getAllOrderHandler = asyncHandler(async (req, res) => {
  const orders = await findAllOrder(req.user);

  res.status(200).json({
    status: 'success',
    data: {
      orders,
    },
  });
});

const getOrderByIdHandler = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  await verifyOrderAccess(orderId, req.user);
  const order = await findOrderById(orderId);

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

const updateStatusOrderHandler = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  await updateStatusOrder(status, orderId);

  res.status(200).json({
    status: 'success',
    message: `Status order dengan id '${orderId}' berhasil diperbarui`,
  });
});

const deleteOrderByIdHandler = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  await verifyOrderAccess(orderId, req.user);
  await deleteOrderById(orderId);

  res.status(200).json({
    status: 'success',
    message: `Order dengan id '${orderId}' berhasil dihapus`,
  });
});

module.exports = {
  addOrderHandler,
  getAllOrderHandler,
  getOrderByIdHandler,
  updateStatusOrderHandler,
  deleteOrderByIdHandler,
};