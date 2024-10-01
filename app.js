const express = require('express');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const placeRoutes = require('./routes/place');
const groupRoutes = require('./routes/group');
const reactionRoutes = require('./routes/reaction');
const pinRoutes = require('./routes/pin');

const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/api', placeRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/reactions', reactionRoutes);
app.use('/pins', pinRoutes);

module.exports = app;
