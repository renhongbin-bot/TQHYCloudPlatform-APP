import App from './App'

// #ifndef VUE3
// 引入VUE
import Vue from 'vue'
// 引入uView库
import uView from 'uview-ui'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
Vue.use(uView)
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif