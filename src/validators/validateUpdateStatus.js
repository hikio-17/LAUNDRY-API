const { body, validationResult } = require('express-validator');
const InvariantError = require('../exeptions/InvariantError');

const optionStatus = ['pending', 'processing', 'completed', 'cancelled'];

exports.validateUpdateStatus = [
  body('status')
    .notEmpty().withMessage('Status tidak boleh kosong')
    .isIn(optionStatus).withMessage('Status tidak sesuai dengan option'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];