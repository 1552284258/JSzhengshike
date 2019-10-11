class Banner {
    constructor(idSelector,url) {
        this.url = url
        this.box = document.querySelector(idSelector);
        this.ul = this.box.querySelector('.img_box ul');
        this.tipBox = this.box.querySelector('.tip_box');
        this.tips = this.box.getElementsByClassName('tip');
        this.leftBtn = this.box.querySelector('.left_btn');
        this.rightBtn = this.box.querySelector('.right_btn');
        this.n = 0;
        this.timer = null;
        this.getData();//获取数据
    }
    getData() {
        let xhr = new XMLHttpRequest();
        xhr.open('get', this.url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
                let data = JSON.parse(xhr.response)
                this.render(data)
                this.Timers() //数据渲染完成之后再去开启动画
                this.tipClick()
                this.bindEvent()
            }
        }
        xhr.send();
    }
    render(data) {
        data = data || []
        let str = '';
        let tipStr = '';
        data.push(data[0]);//在数组的末尾添加了第一项；是为了在最后补一张一样的图
        data.forEach((item, index) => {
            let { img, desc } = item
            str += `<li> 
                <img src="${img}" alt="">
                <p class="desc">${desc}</p>
                </li>`
            if (index !== data.length - 1) {
                if (index == 0) {
                    //只有第一项 才默认有 current 类名
                    tipStr += `<span class="tip current"></span> \n`
                } else {
                    tipStr += `<span class="tip"></span> \n`
                }
            }
        })
        this.ul.innerHTML = str
        this.tipBox.innerHTML = tipStr
        this.ul.style.width = data.length * 590 + 'px';//更新盒子的宽度
    }
    Timers() {
        this.timer = setInterval(() => {
            this.change()
            this.tipClass(this.n)
        }, 2000)
    }
    change() {
        this.n++
        if (this.n == (this.tips.length + 1)) {
            this.ul.style.transition = 'none';
            this.ul.style.left = 0;
            this.n = 1
        }
        this.tipClass(this.n)
        setTimeout(() => {
            this.ul.style.transition = 'left 0.5s ease-in';
            this.ul.style.left = -590 * this.n + 'px'

        }, 10)
    }
    tipClass(m) {
        m = m >= this.tips.length ? 0 : m;//当n指向了伪第一张的时候，我们要让第一个点高亮
        for (let i = 0; i < this.tips.length; i++) {
            this.tips[i].className = 'tip'
        }
        this.tips[m].className = 'tip current'
    }
    bindEvent() {
        //只负责绑定之间
        //划入盒子时，清除动画
        this.box.onmouseenter = () => {
            clearInterval(this.timer)
        }
        //划出盒子时，重启动画
        this.box.onpointerleave = () => {
            this.Timers()
        }
        //点击左右按钮执行的操作
        this.rightBtn.onclick = this.debounce(() => {
            this.change()
            this.tipClass(this.n)
        })
        //点击左右按钮执行的操作
        this.leftBtn.onclick = this.debounce(() => {
            this.n--
            if (this.n < 0) {
                this.ul.style.transition = 'none'; //清除过度效果
                this.ul.style.left = -590 * this.tips.length + 'px'
                this.n = this.tips.length - 1;
            }
            this.tipClass(this.n)
            setTimeout(() => {
                this.ul.style.transition = 'left 0.5s ease-in';
                this.ul.style.left = -590 * this.n + 'px'
            }, 20)
        })
    }
    tipClick() {
        for (let i = 0; i < this.tips.length; i++) {
            this.tips[i].onclick = () => {
                this.n = i
                this.tipClass(this.n)
                this.ul.style.transition = 'left 0.3s ease-in'
                this.ul.style.left = -590 * this.n + 'px'
            }
        }
    }
    debounce(fn, wait = 300) {
        var timer = null;
        return function () {
            if (timer == null) {
                fn.apply(this, arguments)
                timer = 0
                return
            }
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(this, arguments)
                timer = null;
            }, wait)
        }
    }
}

