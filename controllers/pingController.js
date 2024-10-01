const db = require('../config/db');

// 핀 저장
exports.savePin = async (req, res) => {
  const { userId, latitude, longitude } = req.body;

  try {
    await db.query(
      'INSERT INTO pins (user_id, latitude, longitude) VALUES (?, ?, ?)',
      [userId, latitude, longitude]
    );
    res.status(201).json({ message: 'Pin saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving pin', error });
  }
};
// 핀 삭제
exports.deletePin = async (req, res) => {
  const { pinId } = req.params;

  try {
    const [result] = await db.query('DELETE FROM pins WHERE id = ?', [pinId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pin not found' });
    }

    res.status(200).json({ message: 'Pin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pin', error });
  }
};
