let slideBox = document.querySelector('#slideBox')

function getData(url, cb) {
    let xhr = new XMLHttpRequest;
    xhr.open('get', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
            let data = JSON.parse(xhr.response)
            cb && cb(data);//cb存在 并且 执行
        }
    }
    xhr.send()
}
// 获取banner数据
getData('./data/banner.json', function (data) {
    render(data);
    swiperInit();
})

//获取列表数据
getData('./data/list.json', function (data) {
    renderList(data)
})

function renderList(ary) {
    let str = '';
    ary.forEach(item => {
        if (item.type == 0) {
            //无图情况
            str += `<div class="list">
            <div class="textBox">
                <p>安阿尔阿尔发热比较好方宇杰</p>
                <div class="commentBox">
                    <span class="icon_com"></span>
                    <span>${item.comment}</span>
                    <span>环球时报</span>
                </div>
            </div>  
            </div>`
        } else {
            //单图情况
            str += `<div class="list">
            <div class="textBox">
                <p>安阿尔阿尔发热比较好方宇杰</p>
                <div class="commentBox">
                    <span class="icon_com"></span>
                    <span>${item.comment}</span>
                    <span>环球时报</span>
                </div>
            </div>
            <div class="imgBox">
                <img src="${item.img[0]}" alt="">
            </div>
        </div>`
        }
    })
    document.querySelector('.list_box').innerHTML += str
}

function render(ary) {
    let str = '';
    ary.forEach(item => {
        let { img, title } = item
        str += `<div class="swiper-slide">
            <img src="${img}" alt="">
            <p>${title}</p>
            </div>`
    })
    slideBox.innerHTML = str;
}

function swiperInit() {
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        loop: true,
        autoplay: true
    });
}

let scrT = document.documentElement.scrollTop;//卷去的高度
let wH = document.documentElement.clientHeight || document.body.clientHeight;//当前屏幕的高度
let tarT = document.body.clientHeight //body 的高度

function move() {
    scrT = document.documentElement.scrollTop;
    wH = document.documentElement.clientHeight || document.body.clientHeight;
    tarT = document.body.clientHeight;
    if (scrT + wH >= (tarT-10)) {//可能会差一点点 给body的高减去一点就小于他俩的和
        getData('./data/list.json', function (data) {
            renderList(data)
            console.log(111)
        })
    } 
}
window.onscroll = function () {
    move()
}
