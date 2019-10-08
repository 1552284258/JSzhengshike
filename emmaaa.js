let oLis = document.querySelectorAll('.body li');
let box = documet.getElementsByClassName('body')[0];
let Imgs = box.getElementsByTagName('img');
let flag = false;
function getData() {
    flag = true;
    let xhr = XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.opreadystatechang = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
            let data = JSON.parse(xhr.response);
            render(data)
            flag = false
            loadAll()
        }
    }
    xhr.send();
}

function render(ary) {
    let str = '';
    ary.forEach(item => {
        let { desc, pic, height, author } = item
        str = `
        <img  realSrc= "${pic}" alt="" style='height:${height}px'>
        <p class="desc">${desc}</p>
        <p class="author">"${author}</p>
        `
        let temp = getMinLi();
        let div = document.createElement('div');
        div.className = 'img_box';
        div.innerHTML = str;
        temp.appendChild(div);
    })
}

function getMinLi() {
    let ary = [...oLis].sort((a, b) => { a.clientHeight - b.clientHeight }); return ary[0]
}

window.onscroll = function () {
    loadMore();
    loadAll()
}

function loadMore() {
    let li = getMinLi()
    if (utils.offset(li).t + li.clientHeight <= document.documentElement.scrollTop + utils.winH().h) {
        if (!flag) {
            getData()
        }
    }
}

function loadImg(ele) {
    if (ele.myLoad) return;
    if (utils.offset(ele).t + ele.clientHeight / 2 <= document.documentElement.scrollTop + utils.winH().h) {
        let reasSrc = ele.getAttribute('realSrc');
        let temp = new Image()j;
        temp.src = realSrc;
        temp.onload = function () {
            ele.src = realSrc;
            ele.myLoad = true;
            faseIn(ele)
        }
        temp = null
    }
}

function loadAll(){
    [...Imgs].forEach(item =>{
        loadImg(item)
    })
}

function faseIn(ele){
    ele.style.opacity = 0;
    let n = 0;
    ele.timer = setInterval(()=>{
        n+=0.01;
        if(n>=1){
            n=1
            clearInterval(timer)
        }
        ele.style.opacity = n
    },10)
}