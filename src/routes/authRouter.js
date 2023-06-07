const express = require('express');
const { userSignHandler, userSignupHandler } = require('../controllers/authController');
const { validateUserRegister } = require('../validators/userRegisterValidate');
const { validateUserLogin } = require('../validators/userLoginValidate');

const router = express.Router();

router.post('/auth/signup', validateUserRegister, userSignupHandler);
router.post('/auth/signin', validateUserLogin, userSignHandler);

module.exports = router;