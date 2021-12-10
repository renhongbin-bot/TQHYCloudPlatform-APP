import App from './App'
import store from'./store'
//把vuex定义成全局组件
Vue.prototype.$store = store
// 引入VUE
import Vue from 'vue'
// 引入uView库
import uView from 'uview-ui'
// 引入请求api
import { sendRequest } from './util/api.js'
Vue.prototype.$sendRequest = sendRequest
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
		store
})
Vue.use(uView)
app.$mount()

import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
	app.use(store)
  return {
    app
  }
}