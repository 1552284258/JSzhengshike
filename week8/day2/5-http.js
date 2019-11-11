let http = require('http')

http.createServer(function (req,res){
    if(req.url == '/love'){
        res.end('666')
    }else{
        res.end('999')
    }
    
}).listen(8000,function () {
    console.log('服务起于8000端口');
})