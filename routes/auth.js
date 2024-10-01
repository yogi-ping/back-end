const express = require('express');
const router = express.Router();
const {
  login,
  register,
  deleteAccount,
  logout,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// 로그인
router.post('/login', login);

// 회원가입
router.post('/register', register);

// 로그아웃
router.post('/logout', authMiddleware, logout);

// 회원탈퇴
router.delete('/delete', authMiddleware, deleteAccount);

module.exports = router;
