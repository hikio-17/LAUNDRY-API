const express = require('express');
const { authCheck, adminCheck } = require('../middleware/auth');
const { getAllUserHandler, getUserByIdHandlder, deleteUserByIdHandler } = require('../controllers/userController');

const router = express.Router();

router.get('/users', authCheck, adminCheck, getAllUserHandler);
router.get('/users/:id', authCheck, getUserByIdHandlder);
router.delete('/users/:id', authCheck, adminCheck, deleteUserByIdHandler);

module.exports = router;