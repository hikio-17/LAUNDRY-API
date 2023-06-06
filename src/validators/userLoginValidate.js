/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
const { body, validationResult } = require('express-validator');

exports.validateUserLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email tidak boleh kosong')
    .isEmail()
    .withMessage('masukkan email valid.'),
  body('password')
    .notEmpty()
    .withMessage('Passsword tidak boleh kosong'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'fail',
        message: errors.array()[0].msg,
      });
      next();
    }
    next();
  },
];