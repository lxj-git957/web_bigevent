$(function () {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    //获取文章列表
    function initTable() {
        // console.log('获取文章');
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章列表失败！');
                }
                //使用模板引擎渲染页面数据
                console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        });
    }
    initTable()
    //时间过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    //获取文章的分类数据渲染选择框
    function getartdata() {
        $.ajax({
            type: "get",
            url: "/my/article/cates/",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取分类数据失败！');
                }
                //调用模板引擎渲染数据

                var htmlstr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlstr)
                layui.form.render()

            }
        });
    }
    getartdata()

    //实现筛选功能
    $('#form-search').on('submit', function (e) {
        // console.log('点击筛选');
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象 q 中对应的属性赋值

        q.cate_id = cate_id
        q.state = state
        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })
    //分页
    //定义渲染分页的方法
    function renderPage(total) {
            layui.laypage.render({
            elem: 'pagelist' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: total //数据总数，从服务端得到
            ,limit:q.pagesize
            ,curr:q.pagenum,
            layout:['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10]
            ,jump: function(obj,first){
                q.pagenum = obj.curr
                if (!first) {
                    initTable()
                }
            }
          });
    }
    //实现删除功能
    $('tbody').on('click','.btnDelete',function(){
       var id = $(this).attr('data-id')
       layui.layer.confirm('确认删除？',{icon: 3,title: '提示'},function(index){
        $.ajax({
            type: "get",
            url: '/my/article/delete/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('删除文章失败！')
                  }
                  layer.msg('删除文章成功！')
                  initTable()
            }
        });

        layer.close(index)
       })
        

    })
    
})