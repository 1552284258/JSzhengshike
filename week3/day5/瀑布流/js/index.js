let {getCss,setCss,winH,offset} = utils;
let flag = false;
let body = document.getElementsByClassName('body')[0],
    oLis = body.getElementsByTagName('li');

function init() {
    [...oLis].forEach(item => item.innerHTML = '')
}
init()

//先去获取数据
function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|400/.test(xhr.status)) {
            let data = JSON.parse(xhr.response)
            render(data)
            loadAll()
        }
    }
    xhr.send()
}
getData()


function render(data) {
    //data是后台给的数组
    //循环数组，拼接字符串，把拼接好的字符串放到页面中
    let str = '';

    data.forEach((item) => {
        let { pic, author, desc, height } = item
        str = `
            <div class="img_box">
            <img src="${pic}" alt="" 
            style='height:${height}px' >
            <p class="desc">${desc}</p>
            <p class="author">${author}</p>
            </div>`
        //str 是新拼出来的一个块，我们需要决定的是 这个块放在哪个li中
        let temp = getMinLi()
        let div = document.createElement('div')
        div.className = 'img_box'
        div.innerHTML += str;
        temp.appendChild(div)
    })
}

//挑选最矮的li
function getMinLi() {
    var ary = [...oLis].sort((a, b) => {
        return a.clientHeight - b.clientHeight
    })
    return ary[0]
}

// 第三步  滚动 加载新数据；

function loadMore() {
    if(flag)return; // flag 为true代表数据正在加载，这时我们不应该再去加载新数据
    // 1、什么时候加载新数据？ 当最短的那个li露出底部的时候
    // 2、怎么加载新数据？
    let scrT = document.documentElement.scrollTop;// 卷去的高度
    let wH = winH();// 一屏幕的高度
    let temp = getMinLi();// 获取最低的那个LI
    let tarT = offset(temp).t + temp.clientHeight;// 元素到body的距离+元素本身的高度  就是元素底边到body的距离
    if(tarT < scrT+wH){
        // 底部露出之后  加载新数据
        getData();
        console.log(11111)
    }
}
window.onscroll = function () {
    loadMore();
    loadAll(); // 欢动屏幕的时候执行 loadAll
}

function loadImg(ele){
    if(ele.loaded)return;
    let scrT = document.documentElement.scrollTop;
    let wH = winH();
    let tarT = offset(ele).t;
    if(tarT < scrT+wH){
        // 图片加载
        let realSrc = ele.getAttribute('realSrc');
        let temp = new Image();
        temp.src = realSrc;
        temp.onload = function(){
            ele.src = realSrc;
            temp = null;
            ele.loaded = true;
            fadeIn(ele);
        }
    }
}
function loadAll() {
    // 获取所有的img; 然后挨个执行 loadImg()
    let imgs = document.querySelectorAll('.box img');
    [...imgs].forEach(item=>loadImg(item))
}

function fadeIn(ele){
    ele.style.opacity = 0;
    let a = 0;
    ele.timer = setInterval(()=>{
        a+=0.1;
        if(a>=1){
            a = 1;
            clearInterval(ele.timer)
        }
        ele.style.opacity = a;
    },20)
}