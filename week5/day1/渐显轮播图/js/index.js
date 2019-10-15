var banner = (function () {
    let idselector = '';
    let $box = null,
        $ul = null,
        $lis = null,
        $tipBox = null,
        $tips = null,
        $leftBtn = null,
        $rightBtn = null;
    let timer = null, n = 0;

    function throttle(fn, wait=500) {
        let flag = true;
        return function () {
            if (!flag) return
            flag = false
            setTimeout(() => {
                flag = true
                fn.apply(this, arguments)
            }, wait)
        }
    }

    function initEle() {
        $box = $(idSelector)
        $ul = $box.find('.img_box ul')
        $lis = $box.find('.img_box ul li')
        $tipBox = $box.find('.tip_box')
        $tips = $tipBox.children('.tip')
        $leftBtn = $box.find('.left_btn')
        $rightBtn = $box.find('.right_btn')

        $lis.eq(0).show().siblings().hide();

    }

    function getData() {
        $.ajax({
            url: './data.json',
            success: function (data) {
                render(data)
                initEle()
                autoMove()
                autoFocus()
                eventBind()
            },
            error: function () {
                alert('失败')
            }
        })
    }

    function render(data) {
        let str = '', tipStr = '';
        data.forEach((item, index) => {
            str += `<li>
                 <img src="${item.img}" alt="">
                 <p>${item.desc}</p>
                 </li>`;
            tipStr += (index == 0 ? `<span class="tip current"></span>` : ` <span class="tip"></span>`);
        })
        $ul.html(str)
        $tipBox.html(tipStr)
    }

    function move() {
        n++;
        if (n > $lis.length - 1) {
            n = 0
        }
        $lis.eq(n).show().css({ opacity: 0 }).animate({ opacity: 1 }, 300).siblings().animate({ opacity: 0 }, 300, function () {
            $lis.eq(n).siblings().hide();
        })
        autoFocus()
    }

    function autoMove() {
        timer = setInterval(() => {
            move()
            // autoFocus()
        }, 2000)
    }

    function autoFocus() {
        $tips.eq(n).addClass('current').siblings().removeClass('current');
    }

    function eventBind() {
        $box.on('mouseenter', function () {
            clearInterval(timer);
            console.log(666);
            
        })
        $box.on('mouseleave', function () {
            autoMove()
        })

        $leftBtn.on('click',throttle(function () {
            n--
            if (n < 0) {
                n = $lis.length - 1
            }

            n--;  //这个n--是为了抵消move里面的n++
            move()
        }))

        $rightBtn.on('click',throttle(function () {
            move()
        }))

        $tips.on('click', function () {
            let index = $(this).index();
            n = index;

            n--;//这个n--是为了抵消move里面的n++
            move();
        })
    }

    return {
        init() {
            idSelector = '#'+this.attr('id');
            getData()
            initEle()
        }
    }
})()

// banner.init('#box')
$.extend({
    qqq(){
        console.log(666);
        
    }
})

$.fn.extend({
    aaa(){
        console.log(999);
    },
    bannerInit:banner.init
})

$('#box').bannerInit()