let http = require('http')
let url = require('url')
let { readFile } = require('./promiseFs')


http.createServer((req,res)=>{

}).listen(8000,()=>{
    console.log('服务起于8000 ')
})