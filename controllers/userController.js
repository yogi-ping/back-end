const db = require('../config/db');

// 사용자 정보 가져오기
exports.getUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching user', error: err.message });
  }
};

// 사용자 삭제
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    await db.query('DELETE FROM users WHERE id = ?', [id]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting user', error: err.message });
  }
};
