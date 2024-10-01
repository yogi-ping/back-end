const db = require('../config/db');

// 그룹 생성
exports.createGroup = async (req, res) => {
  const { name } = req.body;
  try {
    await db.query('INSERT INTO groups (name) VALUES (?)', [name]);
    res.status(201).json({ message: 'Group created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating group', error });
  }
};

// 그룹 삭제
exports.deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    await db.query('DELETE FROM groups WHERE id = ?', [groupId]);
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting group', error });
  }
};

// 그룹에 친구 초대
exports.inviteUserToGroup = async (req, res) => {
  const { groupId, userId } = req.body;
  try {
    await db.query(
      'INSERT INTO group_members (group_id, user_id) VALUES (?, ?)',
      [groupId, userId]
    );
    res.status(200).json({ message: 'User invited to group' });
  } catch (error) {
    res.status(500).json({ message: 'Error inviting user', error });
  }
};

// 친구 요청 수락
exports.acceptFriendRequest = async (req, res) => {
  const { groupId, userId } = req.body;
  try {
    await db.query(
      'UPDATE group_members SET status = "accepted" WHERE group_id = ? AND user_id = ?',
      [groupId, userId]
    );
    res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting friend request', error });
  }
};

// 친구 요청 거절
exports.declineFriendRequest = async (req, res) => {
  const { groupId, userId } = req.body;
  try {
    await db.query(
      'UPDATE group_members SET status = "declined" WHERE group_id = ? AND user_id = ?',
      [groupId, userId]
    );
    res.status(200).json({ message: 'Friend request declined' });
  } catch (error) {
    res.status(500).json({ message: 'Error declining friend request', error });
  }
};

// 친구 목록에서 삭제
exports.removeUserFromGroup = async (req, res) => {
  const { groupId, userId } = req.body;
  try {
    await db.query(
      'DELETE FROM group_members WHERE group_id = ? AND user_id = ?',
      [groupId, userId]
    );
    res.status(200).json({ message: 'User removed from group' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing user from group', error });
  }
};
