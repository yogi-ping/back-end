const express = require('express');
const router = express.Router();
const pinController = require('../controllers/pinController');
const authMiddleware = require('../middlewares/authMiddleware');

// 핀 저장, 삭제
router.post('/', authMiddleware, pinController.savePin);
router.delete('/:pinId', authMiddleware, pinController.deletePin);
module.exports = router;
