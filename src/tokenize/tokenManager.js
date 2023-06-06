/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const AuthenticationError = require('../exeptions/AuthenticationError');

exports.createAccessToken = async ({ id, username, role }) => {
  const token = await jwt.sign({
    id,
    username,
    role,
  }, 'hikio010217');
  return token;
};

exports.verifyAccessToken = async (token) => {
  const isValid = await jwt.verify(token, 'hikio010217');

  if (!isValid) {
    throw new AuthenticationError('Access token not valid');
  }
};

exports.decodePayload = async (token) => jwt.decode(token, 'hikio010217');