const asyncHandler = require('express-async-handler');
const userSign = require('../services/authService');
const { createAccessToken } = require('../tokenize/tokenManager');
const { createuser } = require('../services/userService');

const userSignupHandler = asyncHandler(async (req, res) => {
  const { id, username, email } = await createuser(req.body);

  res.status(201).json({
    status: 'success',
    message: 'User registered successfully',
    data: {
      addedUser: {
        id,
        username,
        email,
      },
    },
  });
});

const userSignHandler = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const { id, username, role } = await userSign({ email, password });
  const accessToken = await createAccessToken({ id, username, role });

  res.status(201).json({
    status: 'success',
    data: {
      accessToken,
    },
  });
});

module.exports = {
  userSignupHandler,
  userSignHandler,
};