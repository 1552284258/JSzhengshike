class Tab {
    constructor(idSelector) {
        this.box = document.querySelector(idSelector);//获取到最外层盒子
        this.tabs = this.box.getElementsByClassName('tab');
        this.bodys = this.box.getElementsByClassName('body');
        this.mapBind();
    }
    mapBind = function () {
    //this 都是 Tab 的实例
    //this.tabs  是我们要去绑定的元素
    for (let i = 0; i < this.tabs.length; i++) {
        this.tabs[i].onclick = () => {
            //给每一个tab绑定点击事件
            this.clearClass();
            this.tabs[i].className = 'tab current';
            this.bodys[i].className = 'body current';
        }
    }
}
    clearClass = function () {
    //清除类名  this.tabs  this.bodys 上的current类名清除
    for (var i = 0; i < this.tabs.length; i++) {
        this.tabs[i].className = 'tab';
        this.bodys[i].className = 'body'
    }
}    
}
new Tab('#box');
new Tab('#box2');
new Tab('#box3');