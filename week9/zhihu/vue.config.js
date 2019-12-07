module.exports={
    publicPath:'./',
    lintOnSave:false,
    devServer:{
        //本地访问 都被转移到了 知乎的后台
        //本地访问 localhost：8080  由node把请求转接到代理地址
        proxy:'https://www.zhihu.com/api/'
    }
}