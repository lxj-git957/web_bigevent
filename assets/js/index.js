function getinfo(){
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function (res) {
            if(res.status != 0){
                return alert(res.message)
            }
            // console.log(res.data);
            // console.log(123);
            return renderAvatar(res.data)
        }
    });
}

function renderAvatar(obj){
    let name = obj.nickname || obj.username
    $('#welcome').html('欢迎&nbsp&nbsp'+name)
    if(obj.user_pic === null){
        let letter = name[0].toUpperCase()
        $('.text-avatar').html(letter)
        $('.layui-nav-img').hide()
        $('.text-avatar').show()
        
    }else{
        $('.layui-nav-img').attr('src',obj.user_pic).show()
        $('.text-avatar').hide()
    }
}

$(function(){
    // 获取用户基本信息
    getinfo()
    // 退出功能
    var layer = layui.layer
    $('#quit').on('click',function(){
        layer.confirm('确认退出吗？',{icon:3,title:'提示'},function(index){
            console.log(123);
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        })
    })
})