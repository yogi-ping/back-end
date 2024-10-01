const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/api/places', async (req, res) => {
  let conn;
  try {
    const placeData = req.body;
    conn = await db.getConnection();

    const query = `
            INSERT INTO places (city_english_name, city_id, city_korean_name, city_latitude, city_longitude,
                                place_address, place_description, place_google_place_id, place_google_rating,
                                place_google_user_ratings_total, place_id, place_name, place_phone,
                                place_photo_uuid, place_website, schedule_day_count, schedule_finish_time,
                                schedule_spending_minute, schedule_start_time, schedule_what_day,
                                visit_schedule_finish_minute_since_zero, visit_schedule_moving_minute_from_previous_place,
                                visit_schedule_place_id, visit_schedule_start_minute_since_zero)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    await conn.query(query, [
      placeData.city.englishName,
      placeData.city.id,
      placeData.city.koreanName,
      placeData.city.latitude,
      placeData.city.longitude,
      placeData.place.address,
      placeData.place.description,
      placeData.place.googlePlaceId,
      placeData.place.googleRating,
      placeData.place.googleUserRatingsTotal,
      placeData.place.id,
      placeData.place.name,
      placeData.place.phone,
      placeData.place.photoUuid,
      placeData.place.website,
      placeData.schedule.dayCount,
      placeData.schedule.finishTime,
      placeData.schedule.spendingMinute,
      placeData.schedule.startTime,
      placeData.schedule.whatDay,
      placeData.visitSchedule.finishMinuteSinceZero,
      placeData.visitSchedule.movingMinuteFromPreviousPlace,
      placeData.visitSchedule.placeId,
      placeData.visitSchedule.startMinuteSinceZero,
    ]);

    res.status(201).send({ message: '장소가 성공적으로 저장되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: '서버에 문제가 발생했습니다.' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
