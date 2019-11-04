$(function () {
    //当DOM结构加载完成之后执行该函数
    $('.submit').on('click', function (e) {
        let account = $('input[type=text]').val()
        let password = $('input[type=password]').val()
        if (!account || !password) {
            alert('用户名或密码不能为空')
            return
        }
        password = md5(password)
        axios.post('/user/login', {
            account, password
        }).then((data) => {
            //1.跳转到首页
            //2.存储权限信息
            if (data.code == 0) {
                //登录成功
                alert('登录成功',{
                    handled:function(){
                      location.href = './index.html' 
                    }
                })
                //把权限信息存储到本地
                localStorage.setItem('power',data.power)
                //把用户名存储到本地
                localStorage.setItem('username',account)
            } else {
                //密码错误
                alert('账号或密码错误')
            }
        }, (err) => {
            //登录失败
            alert('网络错误，请稍后重试')
            console.log(err)
        })
    })
})
