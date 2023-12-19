const express = require('express');
const {
  register, login, me, allUser, editUser, deleteUser,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/user', allUser);
router.get('/me', authMiddleware, me);
router.post('/register', register);
router.post('/login', login);
router.put('/user/:id', editUser);
router.delete('/user/:id', deleteUser);

module.exports = router;
