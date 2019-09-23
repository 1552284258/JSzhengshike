let data;
let oLis = document.getElementsByTagName('li')
//getELement系列获取到的元素集合是由有映射关系的；当页面上增加或减少了对应的元素，该变量会跟着默认改变
//query系列获取到的元素，没有这种映射关系，获取的时候是哪些元素，那么对应的变量就永远是哪些变量
let xhr = new XMLHttpRequest();//创造实例
xhr.open('get', './data.json', true);//true代表异步，false代表同步
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        data = JSON.parse(xhr.response)
        render(data)//请求成功之后，再去渲染数据
        myBind()
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

        let { img, title, price, num } = item
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

function myBind() {
    timeBtn.onclick = function(){
        box.appendChild(oLis[0]); //把第一个li元素添加到box的末尾
        //若添加的是页面上已近存在的元素，那么 只是相当于改变一下元素的位置，不会新增元素。
        //DOM 的回流；当页面的结构发生改变时，需要浏览器重新渲染页面
        //DOM的重绘；结构不发生改变，只是样式(除了那些改变位置的修改)需要修改的时候，也就是只需要重新渲染对应的css的时候
    }
}
    // var a = document.createDocumentFragment()  文档碎片