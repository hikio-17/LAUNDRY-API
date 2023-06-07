const asynchandler = require('express-async-handler');
const AuthenticationError = require('../exeptions/AuthenticationError');
const AuthorizationError = require('../exeptions/AuthorizationError');
const { verifyAccessToken, decodePayload } = require('../tokenize/tokenManager');

exports.authCheck = asynchandler(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AuthenticationError('Akses token diperlukan');
  }
  await verifyAccessToken(token);
  const decode = await decodePayload(token);

  if (!decode) {
    throw new AuthenticationError('Token yang anda berikan tidak valid.');
  }

  req.user = {
    ...decode,
  };
  next();
});

exports.adminCheck = asynchandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
  }

  next();
});