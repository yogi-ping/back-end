# back-end

## [데브코스 1팀] 실시간 여행 공유사이트입니다

## 폴더 구조
/project-root
│
├── config
│   └── db.js               // DB 연결 설정 파일
│
├── controllers
│   ├── authController.js    // 인증 관련 로직 (로그인, 회원가입, 로그아웃, 회원탈퇴)
│   ├── userController.js     // 사용자 관련 로직 (사용자 정보 가져오기, 삭제)
│   └── placeController.js    // 장소 관련 로직 (장소 추가, 조회)
│
├── models
│   └── userModel.js          // DB 쿼리 처리
│
├── middlewares
│   └── authMiddleware.js      // 검증 미들웨어 (JWT)
│
├── routes
│   ├── auth.js               // 인증 관련 API 라우팅
│   ├── users.js              // 사용자 관련 API 라우팅
│   └── place.js              // 장소 관련 API 라우팅
│
├── app.js
│
├── server.js
│
└── README.md
