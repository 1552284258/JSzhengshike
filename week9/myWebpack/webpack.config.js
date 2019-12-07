let path = require('path')
let hp = require('html-webpack-plugin')
//对于node来说，每一个js文件都是一个模块
//每个模块都有 module exports require 
                    //__dirname(当前所在文件夹的绝对路径)  
                    //__filename(当前文件的绝对路径)
console.log('你好-世界',path.resolve(__dirname,'qqq'))
//path.resolve(__dirname,'qqq') 是吧当前文件 所在文件夹的路径 和 qqq拼接起来
module.exports={
    mode:'development', //开发模式
    entry:'./src/2.js',
    output:{
        filename:'qqq.js',  //默认是 main.js  
        path:path.resolve(__dirname,'qqq'),  //告诉webpack 把生成的文件放到哪个路径下
    },
    plugins:[
        new hp({
            template:'./public/index.html',   //指定该路径下的html作为模板
            
        })
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                use:['babel-loader'],    // 需要处理的
                exclude:/node-modules/, // 排除node-modules
            }
        ]
    }
}