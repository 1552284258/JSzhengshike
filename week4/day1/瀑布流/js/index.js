let flag = false;//新数据渲染完成  新数据一请求就把flag 值为true
let oList = document.querySelectorAll(".body li");
let box = document.getElementsByClassName('body')[0];
let oImgs = box.getElementsByTagName('img');
function getData() {
    //获取后台数据
    flag = true;
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
            //请求成功
            // console.log(xhr.response)
            let data = JSON.parse(xhr.response);
            render(data);//获取成功数据之后渲染数据
            flag = false;//代表新数据渲染完成之后的操作
            loadAll();
        }
    }
    xhr.send();
}
getData();

//渲染数据
function render(ary) {
    let str = '';
    ary.forEach(item => {
        let { desc, pic, height, author } = item;
        str = `
        <img  realSrc= "${pic}" alt="" style='height:${height}px'>
        <p class="desc">${desc}</p>
        <p class="author">"${author}</p>
        `;
        let temp = getMinLi();
        let div = document.createElement('div');
        div.className = 'img_box';
        div.innerHTML = str;
        temp.appendChild(div);
    });
}

//找最低的li
function getMinLi() {
    //能找出最短的那个li
    let ary = [...oList].sort((a, b) => a.clientHeight - b.clientHeight);
    return ary[0];
}
//滚动加载更多

window.onscroll = function () {
    loadMore();
    loadAll();
}
function loadMore() {
    // if(n>=3)return;
    //最短的li露出底部的时候去加载新数据
    let li = getMinLi();
    if (utils.offset(li).t + li.clientHeight <= documeutilsnt.documentElement.scrollTop + utils.winH().h) {
        //需要等新数据渲染到页面之后  再去加载新数据。
        if (!flag) {
            getData();
        }
    }

}
function loadImg(ele) {
    if (ele.myLoad) return;
    //图片懒加载
    if (utils.offset(ele).t + ele.clientHeight / 2 <= document.documentElement.scrollTop + utils.winH().h) {
        //图片露出了一半
        let realSrc = ele.getAttribute("realSrc");
        let temp = new Image();
        temp.src = realSrc;//让临时图片去请求真实的图片地址。
        temp.onload = function () {
            //图片已经从远程拿到了本地
            ele.src = realSrc;
            ele.myLoad = true;//加载过之后的图片就不需要再加载了
            faseIn(ele);
        }
        temp = null;
    }
}
function loadAll() {
    [...oImgs].forEach(item => {
        loadImg(item);
    })

}


function faseIn(ele) {
    ele.style.opacity = 0;
    let n = 0;
    ele.timer = setInterval(() => {
        n += 0.01;
        if (n >= 1) {
            n = 1;
            clearInterval(ele.timer);
        }
        ele.style.opacity = n;
    }, 10)
}