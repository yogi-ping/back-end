// friendModel.js
const db = require('../config/db'); // 데이터베이스 연결 모듈

// 친구 추가
const addFriend = async (userId, friendId) => {
  const query = 'INSERT INTO friends (userId, friendId) VALUES (?, ?)';
  await db.execute(query, [userId, friendId]);
};

// 친구 요청
const sendFriendRequest = async (userId, friendId) => {
  const query = 'INSERT INTO friend_requests (userId, friendId) VALUES (?, ?)';
  await db.execute(query, [userId, friendId]);
};

// 친구 요청 수락
const acceptFriendRequest = async (requestId) => {
  const query = 'UPDATE friend_requests SET status = "accepted" WHERE id = ?';
  await db.execute(query, [requestId]);
};

// 친구 목록 조회
const getFriends = async (userId) => {
  const query = 'SELECT * FROM friends WHERE userId = ?';
  const [rows] = await db.execute(query, [userId]);
  return rows; // 친구 목록 반환
};

module.exports = {
  addFriend,
  sendFriendRequest,
  acceptFriendRequest,
  getFriends,
};
