let data;
let xhr = new XMLHttpRequest(); //创造实例
xhr.open('get', './data.json', true); //true代表异步，false代表同步
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        data = JSON.parse(xhr.response)
        render(data) //请求成功之后，再去渲染数据
        myBind(data)
    }
}
xhr.send()
let box = document.querySelector('#box')
let timeBtn = document.querySelector('#timeBtn')
let priceBtn = document.querySelector('#prictBtn')
let commentBtn = document.querySelector('#commentBtn')

function render(ary) {
    let str = '';
    ary.forEach(item => {
        let {
            img,
            title,
            price,
            num
        } = item
        str += `<li>
        <div id="imgBox">
            <img src="${img}" alt="">
        </div>
        <div id="til">${title}</div>
        <div id="desc">${title}</div>
        <div id="price">￥${price}</div>
        <div id="botBox">
            <div>选购</div>
            <div>${num}评价</div>
        </div>
    </li>`;
    })
    box.innerHTML = str;
}


function myBind(data) {

    function click(ele, key) {
        ele.flag = 1
        ele.onclick = function () {
            this.flag *= -1
            data.sort((a, b) => {
                return (a[key] - b[key]) * this.flag
            })
            render(data);
        }
    }
    click(timeBtn, 'time')
    click(priceBtn, 'price')
    click(commentBtn, 'num')
}