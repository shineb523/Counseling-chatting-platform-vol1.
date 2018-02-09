// 로그인 인증
router.route('/login').post(passport.authenticate('local-login', {
    successRedirect: '/selection',
    failureRedirect: '/signin_failed_authentication',
    failureFlash: true
}));