$(function () {
    //校验密码框
    var form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newpassword: function (value) {
            var oldpassword = $('.oldpassword').val()
            if (value === oldpassword) {
                return '密码不能和原密码一致'
            }
        },
        repwd: function (value) {
            var newpassword = $('.newpassword').val()
            if (value !== newpassword) {
                return '两次输入的新密码不一致'
            }
        }
    })
    //提交数据到后台
    //注册监听事件
    $('#modify-form').on('submit', function (e) {
        e.preventDefault()
        var data = $('#modify-form').serialize()
        console.log(data);
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return '更新密码失败'
                }
                layui.layer.confirm('密码更新,请重新登录!', { icon: 3, title: '提示' }, function (index) {
                    localStorage.removeItem('token')
                    parent.location.href = '/login.html'
                    layer.close(index);
                });
                
            }
        });


    })


})