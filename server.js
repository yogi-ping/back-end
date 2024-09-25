require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
