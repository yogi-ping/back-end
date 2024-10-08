const express = require('express');
const cors = require('cors'); // CORS 라이브러리 추가
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const placeRoutes = require('./routes/place');
const groupRoutes = require('./routes/group');
const reactionRoutes = require('./routes/reaction');
const pinRoutes = require('./routes/ping');

const app = express();
require('dotenv').config();

// CORS 설정 추가
app.use(cors()); // 모든 출처에서 오는 요청 허용

// JSON 요청 처리 미들웨어
app.use(express.json());

// 라우트 설정
app.use('/api', placeRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/reactions', reactionRoutes);
app.use('/pins', pinRoutes);

module.exports = app;
