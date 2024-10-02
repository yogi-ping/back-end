
### 1. 회원가입 (Signup)

-   **Method**:  `POST`
-   **Endpoint**:  `/auth/signup`
-   **Description**: 새로운 사용자를 회원가입 시킵니다.

```
//Request
{
"email": "user@example.com",
"password": "password123",
"name": "John Doe"
}
```
```
//Response (success)
{
  "message": "Signup successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2024-09-30T12:00:00Z"
  }
}
```
```
//Response (Fail)
{
  "message": "Email already in use"
}
```


### 2. 로그인 (Login)

-   **Method**:  `POST`
-   **Endpoint**:  `/auth/login`
-   **Description**: 로그인 시도. 성공 시 JWT 토큰을 반환합니다.

```
//Request
{
  "email": "user@example.com",
  "password": "password123"
}
```
```
//Response (success)
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```
```
//Response (Fail)
{
  "message": "Invalid email or password"
}
```


### 3. 로그아웃 (Logout)

-   **Method**:  `POST`
-   **Endpoint**:  `/auth/logout`
-   **Description**: 로그아웃 처리 (서버에서 토큰 무효화는 서버 상태에 따라 처리 가능).

```
//Request
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```
```
//Response (success)
{
  "message": "Logout successful"
}
```


### 4. 회원탈퇴 (Delete Account)

-   **Method**:  `DELETE`
-   **Endpoint**:  `/auth/delete`
-   **Description**: 회원 계정을 삭제합니다.

```
//Request
{
  "userId": 1,
  "password": "password123"
}
```
```
//Response (success)
{
  "message": "Account deleted successfully"
}
```
```
//Response (Fail: password incorrect)
{
  "message": "Incorrect password"
}
```
```
//Response (Fail: user not found)
{
  "message": "User not found"
}
```


### 5. 친구 요청 보내기 (Send Friend Request)

-   **Method**:  `POST`
-   **Endpoint**:  `/friends/request`
-   **Description**: 친구 요청을 보냅니다.

```
//Request
{
  "userId": 2
}
```
```
//Response (success)
{
  "message": "Friend request sent"
}
```
```
//Response (Fail: request already sent)
{
  "message": "Friend request already sent"
}
```


### 6. 친구 요청 수락 (Accept Friend Request)

-   **Method**:  `POST`
-   **Endpoint**:  `/friends/accept`
-   **Description**: 친구 요청을 수락합니다.

```
//Request
{
  "userId": 2
}
```
```
//Response (success)
{
  "message": "Friend request accepted"
}
```
```
//Response (Fail: No request found)
{
  "message": "No friend request found"
}
```


### 7. 친구 삭제 (Remove Friend)

-   **Method**:  `DELETE`
-   **Endpoint**:  `/friends/:friendId`
-   **Description**: 친구 목록에서 친구를 삭제합니다.

```
//Response (success)
{
  "message": "Friend removed successfully"
}
```
```
//Response (Fail: not friend)
{
  "message": "This user is not in your friend list"
}
```


### 8. 그룹 생성 (Create Group)

-   **Method**:  `POST`
-   **Endpoint**:  `/groups`
-   **Description**: 새로운 그룹을 생성합니다.

```
//Request
{
  "group_name": "Jeju trip",
  "description": "Dol harbang nice"
}
```
```
//Response (success)
{
  "message": "Group created successfully",
  "group": {
    "id": 1,
    "group_name": "Jeju trip",
    "description": "Dol harbang nice",
    "created_at": "2024-10-01T12:00:00Z"
  }
}
```


### 9. 그룹 초대 보내기 (Invite to Group)

-   **Method**:  `POST`
-   **Endpoint**:  `/groups/invite`
-   **Description**: 그룹에 친구를 초대합니다.

```
//Request
{
  "groupId": 1,
  "friendId": 2
}
```
```
//Response (success)
{
  "message": "Invitation sent"
}
```
```
//Response (Fail: already in group)
{
  "message": "User is already a member or has a pending invite"
}
```


### 10. 그룹 초대 수락 (Accept Group Invite)

-   **Method**:  `POST`
-   **Endpoint**:  `/groups/invite/accept`
-   **Description**: 그룹 초대를 수락합니다.

```
//Request
{
  "groupId": 1
}
```
```
//Response (success)
{
  "message": "Invitation accepted"
}
```
```
//Response (Fail: no invitation found)
{
  "message": "No invitation found"
}
```


### 11. 그룹 삭제 (Delete Group)

-   **Method**:  `DELETE`
-   **Endpoint**:  `/groups/:groupId`
-   **Description**: 그룹을 삭제합니다.

```
//Response (success)
{
  "message": "Group deleted successfully"
}
```
```
//Response (Fail: no permission)
{
  "message": "You do not have permission to delete this group"
}
```


### 12. 핑 표시 및 좋아요/싫어요 기능 (Ping Location and Like/Dislike)

-   **Method**:  `POST`
-   **Endpoint**:  `/places/ping`
-   **Description**: 지도에서 위치에 핑을 찍고, 해당 위치에 대해 좋아요 또는 싫어요를 표시합니다.

```
//Request
{
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194
  },
  "reaction": "like"
}
```
```
//Response (success)
{
  "message": "Location pinged with reaction",
  "ping": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "reaction": "like",
    "userId": 1
  }
}
```
```
//Response (Fail: already reacted)
{
  "message": "You have already liked this location"
}
```


### 13. 그룹 내 위치 핑 확인 (Check Pings in Group)

-   **Method**:  `GET`
-   **Endpoint**:  `/groups/:groupId/pings`
-   **Description**: 그룹 내 모든 사용자의 핑을 확인합니다.

```
//Response
{
  "pings": [
    {
      "latitude": 37.7749,
      "longitude": -122.4194,
      "reaction": "like",
      "userId": 1
    },
    {
      "latitude": 35.6895,
      "longitude": 139.6917,
      "reaction": "dislike",
      "userId": 2
    }
  ]
}

