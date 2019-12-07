import http from './http'




//请求部门列表数据
export function getDpList(){
    return http.get('/department/list')
}

//删除部门
export function delDpList(departmentId){
    return http.get('/department/delete',{
        params:{departmentId}
    })
}

//添加部门接口
export function addDpList(option){
    return http.post('/department/add',option)
}

//更新部门接口
export function updateDpList(option){
    return http.post('/department/update',option)
}

//获取用户列表接口
export function getUserList(option){
    //option ===> {departmentId:0,search:''}
    return http.get('/user/list',{
        params:option
    })
}

//删除用户接口
export function delUserList(userId){
    return http.get('/user/delete',{
        params:{userId}
    })
}

//添加用户接口
export function addUserList(option){
    return http.post('/user/add',option)
}

//修改用户接口
export function updateUserList(option){
    return http.post('/user/update',option)
}

//获取用户数据
export function getJobList(){
    return http.get('/job/list')
}

