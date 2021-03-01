$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // 传token
    if (options.url.indexOf('/my/') !== -1) {
      options.headers = {
        Authorization:localStorage.getItem('token') || ''
      }
    }
    //身份验证失败
    options.complete = function(res){
      // console.log(res);
      if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！' ){
        localStorage.removeItem('token')
        window.parent.location.href = '/login.html'
      }

    }
  })



