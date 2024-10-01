// app.js
const express = require('express');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const placeRoutes = require('./routes/place');

const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/api', placeRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

module.exports = app;