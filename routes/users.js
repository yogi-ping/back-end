const express = require('express');
const {
  getUsers,
  deleteUser,
  // 추가 기능이 있을 경우 여기에 추가
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { param } = require('express-validator');
const router = express.Router();

// 정보 가져오기
router.get(
  '/:id',
  authMiddleware,
  param('id').isNumeric().withMessage('User ID must be a number'), // ID 유효성 검사
  getUsers
);

// 삭제
router.delete(
  '/:id',
  authMiddleware,
  param('id').isNumeric().withMessage('User ID must be a number'), // ID 유효성 검사
  deleteUser
);

module.exports = router;
