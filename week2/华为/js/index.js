    let data;
    var xhr = new XMLHttpRequest();
    xhr.open('get','./data.json',false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            data = JSON.parse(xhr.response)
        }
        
    }
    xhr.send();

    var ctBox = document.getElementById('contentBox')
    console.log(ctBox);
    
    function render(ary){
        let str = '';
        ary.forEach(item=>{
            let{img,phone_name,phone_money,comment}=item
        
        str += `<div class="phone_box">
        <div class="img_box">
            <img src="${img}" alt="">
        </div>
        <p class="phone_name">${phone_name}</p>
        <p class="phone_money">￥${phone_money}</p>
        <div class="bot_box">
            <p class="phone_left">选购</p>
            <p class="phone_right">${comment}人评论</p>
        </div>
    </div>`
        })
        ctBox.innerHTML = str
    }
    render(data);

    let timeBtn =document.querySelector('.sort_1');
    let moneyBtn =document.querySelector('.sort_2');
    let commentBtn =document.querySelector('.sort_3');
    let pl1 = document.querySelector('.sort_icon_1');
    let pl2 = document.querySelector('.sort_icon_2');
    let pl3 = document.querySelector('.sort_icon_3');

    timeBtn.flat = moneyBtn.flat = 1;
    timeBtn.onclick=function(){
        this.flat *=-1;
        data.sort((a,b)=>{
            return (a.time-b.time)* this.flat
        })
        render(data);       
        if(this.flat > 0){
            bg1()
        }else{
            bg2()
        }
        
    }
    moneyBtn.onclick=function(){
        this.flat *=-1;
        data.sort((a,b)=>{
            return (a.phone_money-b.phone_money)* this.flat
        })
        render(data);
        if(this.flat > 0){
            bg3()
        }else{
            bg4()
        }
    }

    commentBtn.onclick=function(){
        data.sort((a,b)=>{
            return (b.comment-a.comment)
        })
        render(data);
        bg5()
    }
function bg1(){
    pl1.style.backgroundPosition = '0 -90px'
    pl2.style.backgroundPosition = '0 -70px'
}
function bg2(){
    pl1.style.backgroundPosition = '0 -110px'
    pl2.style.backgroundPosition = '0 -70px'
    pl3.style.backgroundPosition = '0 -29px'
}
function bg3(){
    pl2.style.backgroundPosition = '0 -90px'
    pl1.style.backgroundPosition = '0 -70px'
    pl3.style.backgroundPosition = '0 -29px'
}
function bg4(){
    pl2.style.backgroundPosition = '0 -110px'
    pl1.style.backgroundPosition = '0 -70px'
    pl3.style.backgroundPosition = '0 -29px'
}
function bg5(){
    pl1.style.backgroundPosition = '0 -70px'
    pl2.style.backgroundPosition = '0 -70px'
    pl3.style.backgroundPosition = '0 -52px'
}
