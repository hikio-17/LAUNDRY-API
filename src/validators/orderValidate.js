const { body, validationResult } = require('express-validator');
const InvariantError = require('../exeptions/InvariantError');

exports.validateOrder = [
  body('amount')
    .notEmpty().withMessage('Amount tidak boelh kosong')
    .isNumeric().withMessage('Amount harus berupa number'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }

    next();
  },
];