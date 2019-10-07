let oLis = document.querySelectorAll('.body li');
let box = document.getElementsByTagName('body')[0];
function getData() {
    //获取后台数据
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
            //  请求成功
            console.log(xhr.response)
            let data = JSON.parse(xhr.response);
            remder(data); //获取成功之后，渲染数据
            remder(data);
            remder(data);
            remder(data);
            remder(data);
        }
    }
    xhr.send();

}
getData()

//渲染数据
function remder(ary) {
    let str = '';
    ary.forEach((item, index) => {
        let { pic, desc, height, author } = item;
        str = `<div class="img_box">
                <img src="${pic}" alt="">
                <p class="desc">${desc}</p>
                <p class="author">${author}</p>
                </div>`
        //挨个列的排放 
        // oLis[index%5].innerHTML += str;
        let temp = getMinLi();//找出了最低的li
        //把要增加的这一项 放到最低的那个li中
        temp.innerHTML += str
    })
}

//找最低的 li
function getMinLi(){
    //能找出最短的那个li
    let ary = [...oLis].sort((a,b)=>{
        return a.clientHeight - b.clientHeight;
    })
    return ary[0]
}