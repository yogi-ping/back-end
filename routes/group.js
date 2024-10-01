const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middlewares/authMiddleware');

// 그룹 생성
router.post('/', authMiddleware, groupController.createGroup);

// 그룹 삭제
router.delete('/:groupId', authMiddleware, groupController.deleteGroup);

// 그룹에 친구 초대
router.post('/invite', authMiddleware, groupController.inviteUserToGroup);

// 친구 요청 수락
router.post('/accept', authMiddleware, groupController.acceptFriendRequest);

// 친구 요청 거절
router.post('/decline', authMiddleware, groupController.declineFriendRequest);

// 친구 목록에서 삭제
router.delete('/remove', authMiddleware, groupController.removeUserFromGroup);

module.exports = router;
