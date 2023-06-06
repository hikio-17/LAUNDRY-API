/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
const { nanoid } = require('nanoid');
const { User } = require('../models');
const InvariantError = require('../exeptions/InvariantError');

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

const findAllUser = async (userAccess) => {
  const users = await User.find();

  return users;
};

module.exports = {
  createuser,
};
