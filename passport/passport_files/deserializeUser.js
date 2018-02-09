// 사용자 인증 이후 사용자 요청 시마다 호출
// user -> 사용자 인증 성공 시 serializeUser 메소드를 이용해 만들었던 세션 정보가 파라미터로 넘어온 것임
passport.deserializeUser(function(user, done) {
    console.log('deserializeUser() 호출됨.');
    console.dir(user);

    // 사용자 정보 중 id나 email만 있는 경우 사용자 정보 조회 필요 - 여기에서는 user 객체 전체를 패스포트에서 관리
    // 두 번째 파라미터로 지정한 사용자 정보는 req.user 객체로 복원됨
    // 여기에서는 파라미터로 받은 user를 별도로 처리하지 않고 그대로 넘겨줌
    done(null, user);
});