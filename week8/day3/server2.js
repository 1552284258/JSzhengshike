let http = require('http');
let url = require('url');
let { readFile } = require('./promiseFs')

http.createServer((req, res) => {
    let { pathname, query } = url.parse(req.url, true)
    if (pathname == '/') {
        readFile('./static/index.html').then(data => {
            res.end(data)
        }).catch(err => {
            res.statusCode = 500
        })
    } else {
        if (/\.\w+/.test(pathname)) {
            //有后缀  走的静态资源
            readFile('./static' + pathname).then(data => {
                res.end(data)
            }).catch(err => {
                res.statusCode = 500;
                readFile('./static/error.html').then(data => {
                    res.end(data)
                })
            })
        } else {
            //走接口
            getData(pathname, query, res)

        }

    }
}).listen(3000, function () {
    console.log('服务起于 3000 端口')
});

function getData(pathname, query, res) {
    query.type = query.type || 'dev'
    if (pathname == '/list') {
        readFile('./json/' + query.type + '.json').then(data => {
            res.end(data)
        }).catch(err => {
            res.end('error')
        })
    }
}


/*
    list?type-dev  type=dev 返回dev.json的内容  type=pro  返回 pro.json的内容

*/