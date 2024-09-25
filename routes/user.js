const express = require('express');
const { getUsers, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:id', authMiddleware, getUsers);
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;
