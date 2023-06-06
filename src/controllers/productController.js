const asyncHandler = require('express-async-handler');
const { addProduct } = require('../services/productService');

const addProductHandler = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
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

module.exports = {
  addProductHandler,
};