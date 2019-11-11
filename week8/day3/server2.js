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
        readFile('./static' + pathname).then(data => {
            res.end(data)
        }).catch(err => {
            res.statusCode = 500;
            readFile('./static/error.html').then(data=>{
                res.end(data)
            })
        })
    }
}).listen(3000, function () {
    console.log('服务起于 3000 端口')
});