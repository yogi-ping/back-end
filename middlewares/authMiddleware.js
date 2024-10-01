const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: 'Authentication failed: No token provided' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Authentication failed: Malformed token' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your_jwt_secret'
    );
    req.user = decoded; // 토큰의 payload 정보를 req.user에 저장
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
