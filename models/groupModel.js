// groupModel.js
const db = require('../config/db'); // 데이터베이스 연결 모듈

// 그룹 생성
const createGroup = async (groupData) => {
  const { name, creatorId } = groupData;
  const query = 'INSERT INTO groups (name, creatorId) VALUES (?, ?)';
  const result = await db.execute(query, [name, creatorId]);
  return result.insertId; // 생성된 그룹 ID 반환
};

// 그룹 삭제
const deleteGroup = async (groupId) => {
  const query = 'DELETE FROM groups WHERE id = ?';
  await db.execute(query, [groupId]);
};

// 그룹에 친구 추가
const addMemberToGroup = async (groupId, friendId) => {
  const query = 'INSERT INTO group_members (groupId, friendId) VALUES (?, ?)';
  await db.execute(query, [groupId, friendId]);
};

// 그룹의 모든 멤버 조회
const getGroupMembers = async (groupId) => {
  const query = 'SELECT * FROM group_members WHERE groupId = ?';
  const [rows] = await db.execute(query, [groupId]);
  return rows; // 그룹 멤버 목록 반환
};

module.exports = {
  createGroup,
  deleteGroup,
  addMemberToGroup,
  getGroupMembers,
};
