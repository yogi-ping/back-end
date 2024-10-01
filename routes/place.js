const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/places', async (req, res) => {
  let conn;
  try {
    const placeData = req.body.place; // place 정보를 가져옴
    conn = await db.getConnection();

    const query = `
      INSERT INTO places (city_english_name, city_id, city_korean_name, city_latitude, city_longitude,
                          place_address, place_description, place_google_place_id, place_google_rating,
                          place_google_user_ratings_total, place_id, place_name, place_phone,
                          place_photo_uuid, place_website)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await conn.query(query, [
      placeData.city_english_name,
      placeData.city_id,
      placeData.city_korean_name,
      placeData.city_latitude,
      placeData.city_longitude,
      placeData.place_address,
      placeData.place_description,
      placeData.place_google_place_id,
      placeData.place_google_rating,
      placeData.place_google_user_ratings_total,
      placeData.place_id,
      placeData.place_name,
      placeData.place_phone,
      placeData.place_photo_uuid,
      placeData.place_website
    ]);

    res.status(201).send({ message: '장소가 성공적으로 저장되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: '서버에 문제가 발생했습니다.' });
    console.log(req.body);
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
