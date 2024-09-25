const User = require('../models/user');
const jwt = require('jsonwebtoken');

// 로그인
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && user.password === password) {
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
    res.status(200).json({ message: 'Logged in successfully', token });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
};

// 회원가입
exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  const newUser = new User({ email, password, name });
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
};
