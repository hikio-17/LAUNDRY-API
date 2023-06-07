const { nanoid } = require('nanoid');
const { Op } = require('sequelize');
const { Product } = require('../models');
const NotFoundError = require('../exeptions/NotFoundError');
const ClientError = require('../exeptions/ClientError');
const InvariantError = require('../exeptions/InvariantError');

const addProduct = async ({ name, price }) => {
  const id = `product-${nanoid()}`;

  const product = await Product.create({
    id,
    name,
    price,
  });

  return product;
};

const findProductById = async (id) => {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new NotFoundError(`Product dengan id '${id} tidak ditemukan`);
  }

  return product;
};

const findAllProduct = async () => Product.findAll();

const editProductById = async ({ name = '', price = null }, productId) => {
  const product = await Product.findByPk(productId);

  if (!product) {
    throw new NotFoundError(`Tidak dapat melakukan update product. Product dengan id '${productId} tidak ditemukan`);
  }

  await product.update({
    name: name || product.name,
    price: price || product.price,
  });
};

const deleteProductById = async (id) => {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new NotFoundError(`Tidak dapat menghapus product. Product dengan id '${id} tidak ditemukan`);
  }

  await product.destroy();
};

const verifyExistingProductByName = async (name) => {
  const product = await Product.findOne({
    where: {
      name,
    },
  });

  if (product) {
    throw new InvariantError(`Product dengan nama ${name} sudah tersedia`);
  }
};

module.exports = {
  addProduct,
  editProductById,
  deleteProductById,
  findProductById,
  findAllProduct,
  verifyExistingProductByName,
};