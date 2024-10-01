const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController');
const authMiddleware = require('../middlewares/authMiddleware');

// 좋아요/싫어요 누르기
router.post('/', authMiddleware, reactionController.reactToPlace);

module.exports = router;
