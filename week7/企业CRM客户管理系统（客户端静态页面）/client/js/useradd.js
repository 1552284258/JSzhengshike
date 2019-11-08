$(function () {

    //将当前操作的导航存到sessionStorage中
    sessionStorage.setItem('currentUrl', './page/userlist.html')
    
    let $username = $('.username'),
        $man = $('#man'),
        $woman = $('#woman'),
        $useremail = $('.useremail'),
        $userphone = $('.userphone'),
        $userdepartment = $('.userdepartment'),
        $userjob = $('.userjob'),
        $userdesc = $('.userdesc'),
        $submit = $('.submit')

    let id = location.href.queryURLParams().id;
    //id是编辑的那个用户的id
    if (id != undefined) {
        //是编辑状态
        axios.get('/user/info?userId=' + id).then(data => {
            if (data.code == 0) {
                let { name, sex, email, phone, departmentId, department, jobId, job, desc } = data.data
                $username.val(name);
                sex == 0 ? $man.attr('checked', true) : $woman.attr('checked', true)
                $useremail.val(email)
                $userphone.val(phone)
                $userdesc.val(desc)
                // $userdepartment
                // $userjob
                initDepart('/department/list', $userdepartment, departmentId)//初始化部门列表
                initDepart('/job/list', $userjob, jobId)//初始化职务列表

            } else {
                alert('系统繁忙')
            }
        })
    } else {
        //新增
        initDepart('/department/list', $userdepartment, 1)
        initDepart('/job/list', $userjob, 1)
    }

    //初始化部门列表
    //初始化职务列表
    function initDepart(url, ele, id) {

        axios.get(url).then(data => {
            let ary = data.data || []
            let str = ''
            ary.forEach(item => {
                str += `<option value="${item.id}">${item.name}</option>`
            })
            ele.html(str)//把拼接好的结构放到盒子中
            ele.val(id)//让对应的部门被选中
        })
    }

    $submit.on('click', function () {
        //执行post之前 判断必填输入框是否为空
        //姓名，性别，邮箱，手机，部门，职务
        let name = $username.val(),
            sex = $man[0].checked ? 0 : 1,//男被选中就是男的 没有就是女的
            email = $useremail.val(),
            phone = $userphone.val(),
            departmentId = $userdepartment.val(),
            jobId = $userjob.val(),
            desc = $userdesc.val();
        if (name && email && phone && departmentId && jobId) {
            let obj = {}
            id ? obj.userId = id : null
            let option = {
                name,
                sex,
                email,
                phone,
                departmentId,
                jobId,
                desc
            }
            //新增接口是add；更新接口是update
            let url = id ? '/user/update' : '/user/add'
            axios.post(url, Object.assign(option, obj))
            // lodash;   let o = assign(a,b); 把对象b合并到a中；返回值是合并之后的 a;o===a
        } else {
            alert('必填项不能为空')
        }
    })
})