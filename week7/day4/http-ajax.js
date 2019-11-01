function ajax(url, options = {}) {
    let {
        method = 'get',
        async = 'true', //true是异步
        data = {},
        cache = 'true',  //是否走缓存
        headers = {}
    } = options

    let isGet = method.toLowerCase() == 'get';//判断是否为get
    let searchStr = '';
    for (let k in data) {
        searchStr += `&${k}=${data[k]}`
    }
    searchStr = searchStr.slice(1)
    if (isGet) {
        url = url.indexOf('?') == -1 ? url + '?' + searchStr : url + '&' + searchStr;
    }

    return new Promise(function (res, rej) {
        let xhr = new XMLHttpRequest
        xhr.open(method, url, async)
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (/2\d{2}|304/.test(xhr.status)) {
                    let data = JSON.parse(xhr.response)
                    res(data)
                } else if (/[45]\d{2}/.test(xhr.status)) {
                    rej(xhr)
                }
            }
        }
        xhr.send(JSON.stringify(data))
    })
}
ajax.get = function (url, data) {
    return ajax(url, {
        method: 'get',
        data
    })
}

ajax.post = function (url, data) {
    return ajax(url, {
        method: 'post',
        data
    })
}