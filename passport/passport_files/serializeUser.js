// 사용자 인증 성공 시 호출
// 사용자 정보를 이용해 세션을 만듦
// 로그인 이후에 들어오는 요청은 deserializeUser 메소드 안에서 이 세션을 확인할 수 있음
passport.serializeUser(function(user, done) {
    console.log('serializeUser() 호출됨.');
    console.dir(user);

    done(null, user); // 이 인증 콜백에서 넘겨주는 user 객체의 정보를 이용해 세션 생성
});