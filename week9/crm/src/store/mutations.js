export function changeDpList(state,option){
    state.departmentList = option.data  //更新List
    localStorage.setItem('departmentList',JSON.stringify(option.data))
}

export function changeUserList(state,option){
    state.userList = option.data
    localStorage.setItem('userList',JSON.stringify(option.data))
}

export function jobList(state,option){
    state.jobList = option.data
    localStorage.setItem('jobList',JSON.stringify(option.data))
}

