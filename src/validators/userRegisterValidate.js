/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
const { body, validationResult } = require('express-validator');

exports.validateUserRegister = [
  body('username')
    .notEmpty()
    .withMessage('username tidak boleh kosong.')
    .isString()
    .withMessage('Username harus berupa string'),
  body('email')
    .notEmpty()
    .withMessage('Email tidak boleh kosong')
    .isEmail()
    .withMessage('masukkan email valid.'),
  body('password')
    .notEmpty()
    .withMessage('Passsword tidak boleh kosong')
    .isString()
    .withMessage('Password harus berupa string')
    .isLength({ min: 6 })
    .withMessage('Password harus lebih dari 6 karakter'),

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