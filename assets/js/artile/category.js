$(function(){
    //获取文章列表并渲染
    xuanran ()
    function xuanran (){
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                var datahtml = template('article',res.data)
                $('tbody').empty().html(datahtml)
            }
        });
    }
    //制作弹窗
    var indexadd = null
    $('.category').on('click',function(){
        indexadd = layui.layer.open({
            type:1,
            area: ['500px', '250px'],
            title:'添加文章类别',
            content:$('#popups').html()
        })
    })
    //提交弹出的数据
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('新增分类失败！');
                }
                xuanran ()
                layui.layer.msg('新增分类成功');
                layui.layer.close(indexadd)
            }
        });
    })
})