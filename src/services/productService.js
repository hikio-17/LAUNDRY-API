const { nanoid } = require('nanoid');
const { Product } = require('../models');
const NotFoundError = require('../exeptions/NotFoundError');

const addProduct = async ({ name, price }) => {
  const id = `product-${nanoid()}`;

  const product = await Product.create({
    id,
    name,
    price,
  });

  return product;
};

const editProductById = async ({ name = '', price = null }, productId) => {
  const product = await Product.findByPk(productId);

  if (!product) {
    throw new NotFoundError(`Product dengan id '${productId} tidak ditemukan`);
  }

  await product.update({
    name: name || product.name,
    price: price || product.price,
  });
};

const deleteProductById = async (id) => {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new NotFoundError(`Product dengan id '${id} tidak ditemukan`);
  }

  await product.destroy();
};

module.exports = {
  addProduct,
  editProductById,
  deleteProductById,
};