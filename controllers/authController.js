const db = require('../config/db'); // DB 연결
const bcrypt = require('bcrypt'); // 비밀번호 해싱을 위한 bcrypt
const jwt = require('jsonwebtoken');

// 로그인
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);

    if (rows.length > 0 && (await bcrypt.compare(password, rows[0].password))) {
      const token = jwt.sign({ id: rows[0].id }, 'your_jwt_secret', {
        expiresIn: '1h',
      });
      return res.status(200).json({ message: 'Logged in successfully', token });
    }

    res.status(400).json({ message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// 회원가입
exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 해싱
    await db.query(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, hashedPassword, name]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// 로그아웃
exports.logout = (req, res) => {
  // 클라이언트에서 토큰 삭제
  res.status(200).json({ message: 'Logged out successfully' });
};

// 회원탈퇴
exports.deleteAccount = async (req, res) => {
  try {
    const { userId } = req.body;
    await db.query('DELETE FROM users WHERE id = ?', [userId]);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account', error });
  }
};
