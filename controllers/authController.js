const db = require('../config/db'); // DB 연결
const bcrypt = require('bcrypt'); // 비밀번호 해싱을 위한 bcrypt
const jwt = require('jsonwebtoken'); // JWT 생성을 위한 라이브러리

// 로그인
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 데이터베이스에서 사용자의 이메일로 정보 조회
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
            email,
        ]);

        // 사용자가 존재하고, 비밀번호가 일치하는 경우
        if (
            rows.length > 0 &&
            (await bcrypt.compare(password, rows[0].password))
        ) {
            const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            console.log('로그인 성공:', email); // 로그인 성공 로그
            return res
                .status(200)
                .json({ message: 'Logged in successfully', token });
        }

        // 사용자가 없거나 비밀번호가 일치하지 않는 경우
        console.log('로그인 실패: 잘못된 자격 증명', email); // 로그인 실패 로그
        return res.status(400).json({ message: 'Invalid credentials' });
    } catch (error) {
        console.error('로그인 중 에러 발생:', error); // 에러 로그
        return res.status(500).json({ message: 'Error logging in', error });
    }
};

// 회원가입
exports.join = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 이메일 중복 확인
        const [existingUser] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        if (existingUser.length > 0) {
            console.log('회원가입 실패: 이메일이 이미 사용 중입니다.', email); // 중복 이메일 로그
            return res.status(400).json({ message: 'Email already in use' });
        }

        // 비밀번호 해싱 후 사용자 저장
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [
            email,
            hashedPassword,
        ]);
        console.log('회원가입 성공:', email); // 성공 로그
        return res
            .status(201)
            .json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('회원가입 중 에러 발생:', error); // 에러 로그
        return res
            .status(500)
            .json({ message: 'Error registering user', error });
    }
};

// 로그아웃
exports.logout = (req, res) => {
    // 클라이언트에서 토큰 삭제는 클라이언트 측에서 수행
    console.log('로그아웃 요청 수신'); // 로그 추가
    console.log('사용자 로그아웃 성공'); // 로그 추가
    return res.status(200).json({ message: 'Logged out successfully' });
};

// 회원탈퇴
exports.deleteAccount = async (req, res) => {
    try {
        const { userId } = req.body;
        await db.query('DELETE FROM users WHERE id = ?', [userId]);
        console.log('계정 삭제 성공:', userId); // 로그 추가
        return res
            .status(200)
            .json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('회원탈퇴 중 에러 발생:', error); // 에러 로그
        return res
            .status(500)
            .json({ message: 'Error deleting account', error });
    }
};
