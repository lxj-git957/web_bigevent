$(function () {
    // 验证
    var id = null
    // 写入登入名字
    function getid() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status != 0) {
                    return alert(res.message)
                }
                let name = res.data.username
                $('.login-name').val(name)
                $('.inp-nickname').val(res.data.nickname)
                $('.inp-email').val(res.data.email)
                id = res.data.id
            }
        });
    }
    getid()

    // 修改用户信息
    $('.nicknamesubmit').on('click', function (e) {
        e.preventDefault()
        let nickname = $('.inp-nickname').val().trim()
        let email = $('.inp-email').val().trim()
        if(nickname.length > 6){
            return layer.msg('昵称不能大于六个字符');
        }
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: { id: id, nickname: nickname, email: email },
            success: function (res) {
                let layer = layui.layer
                layer.msg(res.message);
                parent.getinfo()
            }
        })

    })
    //重置
    $('.resetvalue').on('click', function (e) {
        e.preventDefault()
        getid()
    })
})