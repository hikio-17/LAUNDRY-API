const { body, validationResult } = require('express-validator');
const InvariantError = require('../exeptions/InvariantError');

exports.validateProduct = [
  body('price')
    .notEmpty().withMessage('Price tidak boleh kosong')
    .isNumeric().withMessage('Price harus berupa number'),
  body('name')
    .notEmpty().withMessage('Nama Product tidak boleh kosong')
    .isString().withMessage('Name harus berupa string'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }

    next();
  },
];