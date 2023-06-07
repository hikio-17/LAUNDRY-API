const asyncHandler = require('express-async-handler');
const { findAllUser, findUserById, deleteUserById, verifyAccessUser } = require('../services/userService');

const getAllUserHandler = asyncHandler(async (req, res) => {
  const users = await findAllUser();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

const getUserByIdHandlder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await verifyAccessUser(id, req.user);
  const user = await findUserById(id);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const deleteUserByIdHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await deleteUserById(id);

  res.status(200).json({
    status: 'success',
    message: `User dengan id '${id}' berhasil di hapus.`,
  });
});

module.exports = {
  getAllUserHandler,
  getUserByIdHandlder,
  deleteUserByIdHandler,
};