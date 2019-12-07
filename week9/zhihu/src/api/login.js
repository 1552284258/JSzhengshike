import http from './index'

export function login(option){
    return http.post('https://www.zhihu.com/api',option)
}