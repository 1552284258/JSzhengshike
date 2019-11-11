/* 
    fs是node内置模块  用来操作文件的  读写文件
    I/O  input 和 output； IO操作 文件的读写

*/
let fs = require('fs')

//readFile 执行有三个参数  url  编码格式  回调函数
//                             'utf-8'
/* fs.readFile('./package.json', 'utf-8', (err, data) => {
    //若读取文件失败 则err就会有对应的值
    //若成功 则err 为null
    if (err) {
        console.log('err', err)
    } else {
        console.log('data', data)
    }


}) */

/* 
//readFile 异步；  readFileSync 同步；
let data = fs.readFileSync('./package.json', 'utf-8')
console.log(data)
console.log(6666)
 */

// ============= 读文件夹
/* fs.readdir('./es6',null,(err,data)=>{
    if(err){
        console.log(err)
    }else{
        // console.log(data)
        data.forEach(item=>{
            fs.readFile('./es6/'+item,'utf-8',(e,d)=>{
                if(!e){
                    console.log(d)
                }
            })
        })
}
}) */


/* let data = fs.readdirSync('./node','utf-8')
console.log(data);
 */

/* fs.mkdir('./qqq',(err)=>{
    if(!err){
        console.log('成功')
    }else{
        console.log('失败');
    }

    fs.mkdirSync()  同步
}) */

/* 
fs.rmdir('./qqq',(err)=>{
    if(!err){
        console.log('成功')
    }else{
        // 若文件夹中有文件，则就删除失败
        // 根本不存在对应的文件夹 也会删除失败
        console.log(err);
    }

    //fs.rmdirSync()  同步
}) */

/* 
fs.mkdir('./qqq',(err)=>{
    if(!err){
        console.log('成功')
    }
})
 */

/* fs.writeFile('./qqq/1.txt','nn','utf-8',(err)=>{
    if(!err){
        console.log('成功')
    }
}) */

// fs.writeFileSync('./qqq/1.txt','Hello Word','utf-8')

/* fs.appendFile('./qqq/1.txt','你好 中国','utf-8',(err)=>{
    if(!err){
        console.log('OK')
    }
})
 */

function append(url,data) {
    fs.readFile(url,'utf-8',(err,d)=>{
        if(d === undefined){
            d = ''
        }
        fs.writeFile(url,d+data,'utf-8',(err)=>{
            if(!err){
                console.log('添加成功')
            }
        })
        /* if(!err){
            fs.writeFile(url,d+data,'utf-8',(err)=>{
                if(!err){
                    console.log('添加成功')
                }
            })
        }else{
            fs.writeFile(url,data,'utf-8',(err)=>{
                if(!err){
                    console.log('创建成功')
                }
            })
        } */
    })
}
// append('./qqq/2.txt','哈哈哈')


// fs.rmdir('./qqq',(err)=>{
//     console.log(err);
    
// })

// fs.unlink('./qqq/3.txt',(err)=>{
//     console.log(err);
// })

fs.copyFile('./qqq/1.txt','./qqq/3.txt',(err)=>{
    console.log(err);
})

// readFile readdir mkdir rmdir writerFile appendFile copyFil unlink 