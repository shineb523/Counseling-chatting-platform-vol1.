/**
 * 패스포트 라우팅 함수 정의
 *
 * @date 2016-11-10
 * @author Mike
 */

module.exports = function(router, passport) {
    console.log('user_passport 호출됨.');

    // 홈 화면
    router.route('/').get(function(req, res) {
        console.log('/ 패스 요청됨.');

        console.log('req.user의 정보');
        console.dir(req.user);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.render('index_signin.ejs', {login_success:false});
        } else {
            console.log('사용자 인증된 상태임.');
            res.render('selection.ejs', {login_success:true});
        }
    });

    router.route('/signin_failed_authentication').get(function(req, res) {
        console.log('/signin_failed_authentication 패스 요청됨.');
        res.render('index_failed_authentication.ejs');
    });

    router.route('/signup1_cellphone_authentication').get(function(req, res) {
        console.log('/signup1_cellphone_authentication 패스 요청됨.');
        res.render('signup1_cellphone_authentication.ejs');
    });

    router.route('/signup2_account_creation').get(function(req, res) {
        console.log('/signup2_account_creation 패스 요청됨.');
        res.render('signup2_account_creation.ejs');
    });

    router.route('/selection').get(function(req, res) {
        console.log('/selection 패스 요청됨.');
        res.render('selection.ejs');
    });

    router.route('/signup_success').get(function(req, res) {
        console.log('/signup_success 패스 요청됨.');
        res.render('signup_success.ejs', {user: req.user});
    });


    // 프로필 화면
    router.route('/profile').get(function(req, res) {
        console.log('/profile 패스 요청됨.');

        // 인증된 경우, req.user 객체에 사용자 정보 있으며, 인증안된 경우 req.user는 false값임
        console.log('req.user 객체의 값');
        console.dir(req.user);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        } else {
            console.log('사용자 인증된 상태임.');
            console.log('/profile 패스 요청됨.');
            console.dir(req.user);

            if (Array.isArray(req.user)) {
                res.render('profile.ejs', {user: req.user[0]._doc});
            } else {
                res.render('profile.ejs', {user: req.user});
            }
        }
    });

    // 로그아웃
    router.route('/logout').get(function(req, res) {
        console.log('/logout 패스 요청됨.');
        req.logout();
        res.redirect('/');
    });


    // 로그인 인증
    router.route('/login').post(passport.authenticate('local-login', {
        successRedirect : '/selection',
        failureRedirect : '/signin_failed_authentication',
        failureFlash : true
    }));

    // 회원가입 인증
    router.route('/signup').post(passport.authenticate('local-signup', {
        successRedirect : '/signup_success',
        failureRedirect : '/signup2_account_creation',
        failureFlash : true
    }));

};
