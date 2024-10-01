// authService.js
const db = require('../config/db'); // DB 연결
const bcrypt = require('bcrypt'); // 비밀번호 해싱을 위한 bcrypt
const jwt = require('jsonwebtoken'); // JWT 생성 및 검증

/**
 * 사용자 로그인
 * @param {Object} req - Express 요청 객체
 * @param {Object} res - Express 응답 객체
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 이메일로 사용자 조회
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);

    // 사용자 존재 여부 및 비밀번호 확인
    if (rows.length > 0 && (await bcrypt.compare(password, rows[0].password))) {
      const token = jwt.sign({ id: rows[0].id }, 'your_jwt_secret', {
        expiresIn: '1h', // 토큰 만료 시간 설정
      });
      return res.status(200).json({ message: 'Logged in successfully', token });
    }

    res.status(400).json({ message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

/**
 * 사용자 회원가입
 * @param {Object} req - Express 요청 객체
 * @param {Object} res - Express 응답 객체
 */
exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);
    // 사용자 데이터베이스에 추가
    await db.query(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, hashedPassword, name]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

/**
 * 사용자 로그아웃
 * @param {Object} req - Express 요청 객체
 * @param {Object} res - Express 응답 객체
 */
exports.logout = (req, res) => {
  // 클라이언트에서 토큰 삭제
  res.status(200).json({ message: 'Logged out successfully' });
};

/**
 * 사용자 계정 삭제
 * @param {Object} req - Express 요청 객체
 * @param {Object} res - Express 응답 객체
 */
exports.deleteAccount = async (req, res) => {
  try {
    const { userId } = req.body;
    // 사용자 계정 삭제
    await db.query('DELETE FROM users WHERE id = ?', [userId]);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account', error });
  }
};
