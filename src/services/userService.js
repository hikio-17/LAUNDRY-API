/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
const { nanoid } = require('nanoid');
const { User } = require('../models');
const InvariantError = require('../exeptions/InvariantError');
const NotFoundError = require('../exeptions/NotFoundError');
const AuthorizationError = require('../exeptions/AuthorizationError');

const createuser = async ({ username, email, password, role = 'user' }) => {
  const id = `user-${nanoid()}`;
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new InvariantError('Email sudah digunakan');
  }

  const user = {
    id,
    username,
    email,
    password,
    role,

  };
  const newUser = await User.create(user);

  return newUser;
};

const findUserByEmail = async (email) => User.findOne({
  where: {
    email,
  },
});

const findAllUser = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });

  return users;
};

const findUserById = async (userId) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
    attributes: {
      exclude: ['password'],
    },
  });

  if (!user) {
    throw new NotFoundError(`User dengan id '${userId}' tidak ditemukan`);
  }

  return user;
};

const deleteUserById = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new NotFoundError(`User dengan id '${userId}' tidak ditemukan`);
  }

  await user.destroy();
};

const verifyAccessUser = async (userId, userAccess) => {
  const user = await findUserById(userId);
  if (user.id !== userAccess.id && userAccess.role !== 'admin') {
    throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
  }
};

module.exports = {
  createuser,
  findAllUser,
  findUserByEmail,
  deleteUserById,
  findUserById,
  verifyAccessUser,
};
