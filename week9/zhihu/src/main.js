import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/less/common.less'  //引用共用样式

// vant的全部引入的方式
/* import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant) */

//vant 单体引入
import { Search,Button,Icon,Tab, Tabs } from 'vant';
Vue.use(Search).use(Button).use(Icon).use(Tab).use(Tabs);



Vue.config.productionTip = false

//判断登录
let token = localStorage.getItem('token')
if (token) {
  store.commit('stateChange', { loginState: true })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
