Vue.directive('focus', function (el, obj) {
    if (obj.value) {
        setTimeout(() => {
            el.focus()
        }, 10);
    }
})
let vm = new Vue({
    el: "#app",
    data: {
        ary: [],
        todo: '',
        hash: '',//用来存储当前路径的hash值
        count: 0,

    },
    methods: {
        del(obj) {
            this.ary = this.ary.filter(item => item.id != obj.id)
        },
        add() {
            this.todo = this.todo.trim()
            if (!this.todo) return

            let obj = {
                id: this.ary.length + 1,
                done: false,
                editable: false,
                todo: this.todo
            }
            this.ary.unshift(obj)
            this.todo = ''
            
        },
        cut(item, index) {
            item.editable = !item.editable
            if (item.editable == false && !item.todo.trim()) {
                this.ary.splice(index, 1)
            }
        },
    },
    created() {
        this.hash = location.hash || '#/all';
        window.addEventListener('hashchange', () => {
            this.hash = location.hash
        });
        //从本地存储中获取数据
        this.ary = JSON.parse(localStorage.getItem('mytodolist')) || []
    },
    computed: {
        todoAry() {
            //未完成的事情的个数，因为只要数组发送改变，count就要重新赋值
            this.count = this.ary.filter(item => !item.done).length
            //只要this.ary发送改变，就要把数据存储到本地
            localStorage.setItem('mytodolist',JSON.stringify(this.ary))
            //依赖ary 依赖hash
            switch (this.hash) {
                case '#/all':
                    //若是全部列表 则把整个数组返回
                    return this.ary
                case '#/finished':
                    //若是完成列表则返回ary中 done属性是true 的项
                    return this.ary.filter(item => item.done)
                case '#/unfinished':
                    return this.ary.filter(item => !item.done)
                default:
                    break;
            }
        }
    }
})