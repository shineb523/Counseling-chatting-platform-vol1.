// 상담자 선택 시, 방 생성 페이지로 이동
router.route('/create_room').get(function(req, res) {
    console.log('/create_room 패스 요청됨.');
    res.render('create_room.ejs');
});