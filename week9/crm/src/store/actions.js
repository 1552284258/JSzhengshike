import { getDpList, getUserList, getJobList } from '@/api/index.js'
export function changeDpList({ commit }) {
    getDpList().then(data => {
        if (data.code == 0) {
            commit('changeDpList', data)
        }
    })
}

export function changeUserList({ commit }, option = {}) {
    //调用ajax请求
    getUserList(option).then(data => {
        if (data.code == 0) {
            commit('changeUserList', data)
        }
    })
}

export function jobList({ commit }, option = {}) {
    //调用ajax请求
    getJobList(option).then(data => {
        if (data.code == 0) {
            commit('jobList', data)
        }
    })
}
