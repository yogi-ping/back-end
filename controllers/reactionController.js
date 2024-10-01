const db = require('../config/db');

// 좋아요 누르기
exports.reactToPlace = async (req, res) => {
  const { userId, placeId, reaction } = req.body;

  try {
    const [existingReaction] = await db.query(
      'SELECT * FROM reactions WHERE user_id = ? AND place_id = ?',
      [userId, placeId]
    );

    if (existingReaction.length > 0) {
      if (existingReaction[0].reaction === reaction) {
        // 같은 반응을 다시 누르면 삭제
        await db.query(
          'DELETE FROM reactions WHERE user_id = ? AND place_id = ?',
          [userId, placeId]
        );
        return res.status(200).json({ message: 'Reaction removed' });
      } else {
        // 다른 반응으로 업데이트
        await db.query(
          'UPDATE reactions SET reaction = ? WHERE user_id = ? AND place_id = ?',
          [reaction, userId, placeId]
        );
        return res.status(200).json({ message: 'Reaction updated' });
      }
    }

    // 새 반응 추가
    await db.query(
      'INSERT INTO reactions (user_id, place_id, reaction) VALUES (?, ?, ?)',
      [userId, placeId, reaction]
    );
    res.status(201).json({ message: 'Reaction added' });
  } catch (error) {
    res.status(500).json({ message: 'Error reacting to place', error });
  }
};
