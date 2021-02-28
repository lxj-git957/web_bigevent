$(function () {
    $('.reg').on('click', function () {
        $('.login-form').hide()
        $('.reg-form').show()
    })
    $('.log').on('click', function () {
        $('.login-form').show()
        $('.reg-form').hide()
    })
    var form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-form [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致！'
            }
        }
    });
    var layer = layui.layer
    // layer.msg('注册成功，请登录！')
    $('#form-reg').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            },
            success: function (res) {
                return layer.msg(res.message)
            }
        });
    })
    $('#form-login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/api/login",
            data: {
                username: $('#form-login [name=username]').val(),
                password: $('#form-login [name=password]').val()
            },
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
                return layer.msg(res.message)
                
            }
        });
    })
})