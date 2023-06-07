const { nanoid } = require('nanoid');
const { Order, Product } = require('../models');
const NotFoundError = require('../exeptions/NotFoundError');
const AuthorizationError = require('../exeptions/AuthorizationError');

const addOrder = async (amount, productId, userId) => {
  const product = await Product.findByPk(productId);

  const id = `order-${nanoid()}`;
  const totalPrice = amount * product.price;

  const order = await Order.create({
    id,
    productId,
    userId,
    amount,
    totalPrice,
  });

  return order;
};

const findOrderById = async (id) => {
  const order = await Order.findOne({
    where: {
      id,
    },
  });

  if (!order) {
    throw new NotFoundError(`Order dengan id '${id}' tidak ditemukan`);
  }

  return order;
};

const verifyOrderAccess = async (orderId, userAccess) => {
  const order = await findOrderById(orderId);

  if (order.userId !== userAccess.id && userAccess !== 'admin') {
    throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
  }
};

const findAllOrder = async (userAccess) => {
  const query = userAccess.role === 'admin' ? {} : { where: { userId: userAccess.id } };

  return Order.findAll(query);
};

const deleteOrderById = async (id) => {
  const order = await findOrderById(id);

  await order.destroy();
};

module.exports = {
  addOrder,
  verifyOrderAccess,
  findAllOrder,
  findOrderById,
  deleteOrderById,
};