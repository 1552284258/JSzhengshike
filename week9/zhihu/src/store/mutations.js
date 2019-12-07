// export default {
//     add(state, option) {
//         state.count += option.n
//     },
//     minus(state, option) {
//         state.count -= option.n
//     }
// }

export const add = (state, option) => {
    state.count += option.n
}

export function minus(state, option) {
    state.count -= option.n
}

export function stateChange(state, option) {
    state.loginState = option.loginState
}

export function changeHotList(state,option){
    //对于hotlist我们到底是整个替换，还是往上添加？？
    //option有两个参数，newType  oldType
    if(option.newType == option.oldType){
        state.hotList.push(...option.data)
    }else{
        state.hotList = option.data
    }

}