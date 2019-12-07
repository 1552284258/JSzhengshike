import axios from 'axios'

//根据当前到底是开发环境 还是 生产环境 来决定基础路径是哪个，开发环境下不需要基础路径，
//因为开发环境下，我们就是让请求 去localhost:8080  然后node会根据配置的proxy代理，
//将请求 转接到 对应的远程地址：：proxy只在开发环境下有用，生产环境下 是没用的。
let url = process.env.NODE_ENV !== 'production' ? '':'https://www.zhihu.com/api'
const http = axios.create({
    baseURL:url,
    transformRequest(data){
        //lodash
        let str = ''
        //把data转成serch字符串
        for(let k in data){
            str +=`${k}=${data[k]}&`
        }
        return str
    },
    params:{
        t:Math.random()
    },
    timeout:5000
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 在响应请求之前做些什么

    return response.data;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

export default http  //导出二次封装后的axios 即http