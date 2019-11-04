$(function () {
    let $tbody = $('.tableBox tbody'),
        $del = $('.deleteAll'),
        $selectAll = $('.tableBox thead .w3'),
        $handle = $('.tableBox thead .w12'),
        $selectItems = null,
        $delBtn = null,
        $resetBtn = null,
        $selectBox = $('.selectBox'),
        $deleteAll = $('.deleteAll')

    let canShow = true

    function role() {
        //按照resetpassword这个权限进行判断
        let power = localStorage.getItem('power');
        if (power.indexOf('resetpassword') == -1) {
            canShow = false
            $del.hide();
            $selectAll.hide();
            $handle.hide();
        }
    }
    role()
    function getData(options = {}) {
        //options 是传进来的搜索条件
        axios.get('/user/list', { params: options }).then((data) => {
            render(data.data)
            $selectItems = $('.tableBox tbody input[type=checkbox]')
            eventBind()//数据渲染完成之后再去绑定事件
        }).catch((err) => {
            alert(err)
        })
    }
    getData()

    function render(data=[]) {
        let str = '';
        data.forEach(item => {
            let { id, name = '', sex = '', email = '', phone = '', departmentId = '', department = '', jobId = '', job = '', desc = '' } = item
            str += `<tr>
            ${
                canShow ? '<td class="w3"><input type="checkbox"></td>' : ''
                }
                <td class="w10">${name}</td>
                <td class="w5">${sex == 0 ? '男' : '女'}</td>
                <td class="w10">${department}</td>
                <td class="w10">${job}</td>
                <td class="w15">${email}</td>
                <td class="w15">${phone}</td>
                <td class="w20">${desc}</td>
                ${
                canShow ? `
                <td class="w12 btnBox">
                <a href="./useradd.html?id=${id}" class="redact" data-id=${id}>编辑</a>
                <a href="javascript:;" class="del" data-id=${id}>删除</a>
                <a href="./reset.html?id=${id}" class="reset" data-id=${id}>重置密码</a>
                </td>
                    `: ''
                }
            </tr>`
        })
        $tbody.html(str)
    }

    //实现全选功能
    $selectAll.find('input').on('change', function () {
        $selectItems.get().forEach(item => {
            item.checked = this.checked;
        })
    })


    function eventBind() {
        $delBtn = $('.tableBox tbody .btnBox .del')
        $resetBtn = $('.tableBox tbody .btnBox .reset')
        //给所有的 删除按钮 和 重置按钮 绑定点击事件
        $delBtn.on('click', function () {
            console.log(this)
            let ele = this
            alert('确定删除吗?', {
                confirm: true,
                handled(type) {
                    console.log(type)
                    if (type == 'CONFIRM') {
                        //1.怎么告诉后端对应的ID
                        //2.删除成功之后，前端怎么移除这一条
                        deleteFn($(ele).attr('data-id'))
                    }
                }
            })
        })
        $resetBtn.on('click', function () {
            console.log(this)
            alert('密码已重置为1234567890')
        })
    }

    function deleteFn(id) {

        axios.get('/user/delete', { params: { userId: id } }).then((data) => {
            if (data.data == 0) {
                //删除成功

            }
        })
    }


    //获取下拉列表要展示的内容
    function initSelect() {
        axios.get('/department/list').then(data => {
            if (data.code == 0) {
                let str = '<option value="0">全部</option>';
                data.data.forEach(item => {
                    str += `<option value="${item.id}">${item.name}</option>`
                })
                $selectBox.html(str)
            }
        }).catch(err => { console.log(err) })
    }
    initSelect()

    //选中下拉框指定内容时触发的函数
    $('.selectBox').on('change', function () {
        getData({ departmentId: this.value })
    })

    //实现搜索框功能
    $('.searchInp').on('keydown', function (e) {
        if (e.keyCode == 13) {
            getData({
                departmentId: $('.selectBox')[0].value,
                search: this.value
            })
            this.value = '';
        }
    })


    //实现批量删除
    function batchDelete() {
        let items = $('tbody tr').get().filter(item => {
            // 返回true 就把当前像放到新数组中
            return $(item).find('input[type="checkbox"]')[0].checked
        })
        //items 中存放的就是 选中的那几个 tr 
        let ary = [];
        items.forEach(item => {
            // 获取要删除的这条数据的ID
            let id = $(item).find('a:nth-child(2)').attr('data-id');
            let p = axios.get('/user/delete?userId=' + id)
            ary.push(p);
        })
        axios.all(ary).then(data => {
            consolde.log(data)
        })
    }
    $deleteAll.on('click', batchDelete)
})

