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

        req.app.check=false;
        console.log(req.app.check);

        console.log('req.user의 정보');
        console.dir(req.user);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.render('index_signin.ejs', {
                login_success: false
            });
        } else {
            console.log('사용자 인증된 상태임.');
            res.render('selection.ejs', {
                login_success: true
            });
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

    router.route('/find_account').get(function(req, res) {
        console.log('/find_account 패스 요청됨.');
        res.render('find_account.ejs');
    });

    router.route('/selection').get(function(req, res) {
        console.log('/selection 패스 요청됨.');
        res.render('selection.ejs');
    });

    router.route('/signup_success').get(function(req, res) {
        console.log('/signup_success 패스 요청됨.');
        res.render('signup_success.ejs', {
            user: req.user
        });
    });

    // 내담자 선택 시 or 둘러보기 선택 시, 방 목록 페이지로 이동
    router.route('/room_list').get(function(req, res) {
        console.log('/room_list 패스 요청됨.');
        res.render('room_list.ejs');
    });

    // 상담자 선택 시, 방 생성 페이지로 이동
    router.route('/create_room').get(function(req, res) {
        console.log('/create_room 패스 요청됨.');
        res.render('create_room.ejs');
    });

    // 비밀번호 수정 선택 시, 비밀번호 수정 페이지로 이동
    router.route('/current_password_confirm').get(function(req, res) {
        console.log('/current_password_confirm 패스 요청됨.');
        res.render('current_password_confirm.ejs');
    });

    // 회원탈퇴 선택 시, 회원탈퇴 사유 페이지로 이동
    router.route('/withdrawal_reason').get(function(req, res) {
        console.log('/withdrawal_reason 패스 요청됨.');
        res.render('withdrawal_reason.ejs');
    });

    // 회원탈퇴 선택 시, 회원탈퇴 사유 페이지로 이동
    router.route('/my_profile').get(function(req, res) {
        console.log('/my_profile 패스 요청됨.');
        res.render('my_profile.ejs');
    });

    // 로그아웃
    router.route('/logout').get(function(req, res) {
        console.log('/logout 패스 요청됨.');
        req.logout();
        res.render('index_signin.ejs');
    });




    // 로그인 인증
    router.route('/login').post(passport.authenticate('local-login', {
        successRedirect: '/selection',
        failureRedirect: '/signin_failed_authentication',
        failureFlash: true
    }));

    // 회원가입 인증
    router.route('/signup').post(passport.authenticate('local-signup', {
        successRedirect: '/signup_success',
        failureRedirect: '/signup2_account_creation',
        failureFlash: true
    }));

    router.route('/current_password_confirm').post(function(req, res) {

        var current_password=req.body.current_password;

        console.log('/current_password_confirm 패스 요청됨.');

        console.log('req.user의 정보');
        console.dir(req.user);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.render('index_signin.ejs', {
                login_success: false
            });
        } else {
            console.log('사용자 인증된 상태임.');

            var database = req.app.get('database');
            database.UserModel.findOne({
                'id': req.user.id
            }, function(err, user) {
                if (err) {
                    console.log(err);
                    res.render('error.ejs');
                    return;
                }

                // 등록된 사용자가 없는 경우
                if (!user) {
                    console.log('세션 아이디가 데이터베이스에 존재하지 않거나, 세션이 존재하지 않음.');
                    res.render('error.ejs');
                    return;
                }

                // 비밀번호 비교하여 맞지 않는 경우
                var authenticated = user.authenticate(current_password, user._doc.salt, user._doc.hashed_password);
                if (!authenticated) {
                    console.log('현재 비밀번호 일치하지 않음.');
                    res.render('current_password_confirm_failed.ejs');
                    return;
                }

                if((!err)&&user&&authenticated){
                    // 정상인 경우
                    console.log('현재 비밀번호가 일치함.');
                    req.app.check=true;
                    console.log(req.app.check);
                    res.render('modify_password.ejs');
                }
            });
        }
    });

    router.route('/modify_password').post(function(req, res) {

        var new_password=req.body.new_password;

        console.log('/modify_password 패스 요청됨.');

        console.log('req.user의 정보');
        console.dir(req.user);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.render('index_signin.ejs', {
                login_success: false
            });
        } else {

            if(!req.app.check){
                console.log('현재 비밀번호 확인되지 않음.');
                res.render('current_password_confirm.ejs');
                return;
            }

            console.log('사용자 인증된 상태임.');

            var database = req.app.get('database');
            database.UserModel.findOne({
                'id': req.user.id
            }, function(err, user) {
                if (err) {
                    console.log(err);
                    res.render('error.ejs');
                    return;
                }

                // 등록된 사용자가 없는 경우
                if (!user) {
                    console.log('세션 아이디가 데이터베이스에 존재하지 않거나, 세션이 존재하지 않음.');
                    res.render('error.ejs');
                    return;
                }

                // 비밀번호 비교하여 맞지 않는 경우
                var authenticated = user.authenticate(current_password, user._doc.salt, user._doc.hashed_password);
                if (!authenticated) {
                    console.log('현재 비밀번호 일치하지 않음.');
                    res.render('current_password_confirm_failed.ejs');
                    return;
                }

                if((!err)&&user&&authenticated){
                    // 정상인 경우
                    console.log('현재 비밀번호가 일치함.');
                    res.render('modify_password.ejs');
                }
            });
        }
    });

};
