const asyncHandler = require('express-async-handler');
const { addProduct, findAllProduct, findProductById, deleteProductById, editProductById, verifyExistingProductByName } = require('../services/productService');

const addProductHandler = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  await verifyExistingProductByName(name);
  const product = await addProduct({ name, price });

  res.status(201).json({
    status: 'success',
    message: 'Berhasil menambahkan product baru',
    data: {
      addedProduct: {
        product,
      },
    },
  });
});

const getAllProductHandler = asyncHandler(async (req, res) => {
  const products = await findAllProduct();

  res.status(200).json({
    status: 'success',
    data: {
      products,
    },
  });
});

const getProductByIdHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await findProductById(id);

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

const deleteProductByIdHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await deleteProductById(id);

  res.status(200).json({
    status: 'success',
    message: `Product dengan id '${id}' berhasil di hapus.`,
  });
});

const updateProductByIdHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await editProductById(req.body, id);

  res.status(200).json({
    status: 'success',
    message: `Product dengan id '${id}' berhasil diperbarui`,
  });
});

module.exports = {
  addProductHandler,
  getAllProductHandler,
  getProductByIdHandler,
  updateProductByIdHandler,
  deleteProductByIdHandler,
};