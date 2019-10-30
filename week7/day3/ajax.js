
function ajax(options) {
    let {
        method = 'get',  //默认是get请求
        url='',
        data = {},    //默认空对象
        async = true, //默认异步
        cache = true, //默认走缓存
        headers = {}, //默认空对象
        success,
        error
    } = options;
    method = method.toLowerCase();//防止大写

    // 处理data
    let searchStr = '';
    for (let k in data) {
        searchStr += `${k}=${data[k]}&`
    }
    searchStr = searchStr.replace(/&$/, '')

    // 处理url
    if (method == 'get') {
        //  判断之前的url上有没有 问号
        if (url.indexOf('?') == -1) {
            url += '?' + searchStr
        } else {
            url += '&' + searchStr
        }

        if (!cache) {
            //不走缓存
            url += `&_=${Date.now()}`  //Date.now() 相当于 new Date().getTime()
        }
    }


    let xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (/200|304/.test(xhr.status)) {
                let data;
                try {
                    data = JSON.parse(xhr.response)
                } catch (error) {
                    data = xhr.response
                }
                success && success(data)
            }else if(/[45]\d{2}/.test(xhr.status)){
                error && error(xhr)
            }
        }
    }

    headers = Object.assign({
        'content-type': 'application/x-www-form-urlencoded'
    }, headers)
    // 设置请求头
    for (let k in headers) {
        xhr.setRequestHeader(k, escape(headers[k]))//为了处理中文
    }

    xhr.send(searchStr);
}