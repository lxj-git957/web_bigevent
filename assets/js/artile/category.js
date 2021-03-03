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
    //实现删除功能
    $('body').on('click','.btnDelete',function(){
        let id = $(this).attr("data-id")
        $.ajax({
            type: "get",
            url: "/my/article/deletecate/" + id,
            success: function (res) {
                if(res.status !== 0){
                    return layui.layer.msg('删除文章分类失败')
                }
                layui.layer.msg('删除文章分类成功');
                xuanran()
            }
        });

    })
    //实现编辑功能
    //制作弹窗
    var indexedit = null
    $('tbody').on('click','.btnEdit',function(){
        indexedit = layui.layer.open({
            type:1,
            area: ['500px', '250px'],
            title:'修改文章类别',
            content:$('#editcatagory').html()
        })
    //填充首次打开编辑页面数据
        let id = $(this).attr("data-id")
        $.ajax({
            type: "get",
            url: "/my/article/cates/"+id,
            success: function (res) {
                layui.form.val('form-edit',res.data)
                // let name = res.data.name
                // let alias = res.data.alias
                // $('.editCategoryInfo').empty().val(name)
                // $('.editAliasInfo').empty().val(alias)
            }
        });
    })
    //提交数据
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        console.log('确认修改');
        $.ajax({
            type: "post",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新数据失败！')
                }
                layui.layer.msg('更新数据成功！');
                layui.layer.close(indexedit)
                xuanran()
            }
        });

    })




})