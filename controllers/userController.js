const db = require('../config/db');

exports.getUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(`SELECT * FROM users WHERE id = ?`, [id]);
    res.status(200).json(rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching user', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(`DELETE FROM users WHERE id = ?`, [id]);
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting user', error: err.message });
  }
};
