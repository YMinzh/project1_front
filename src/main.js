import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import globalVariable from './assets/global_variable.js'


Vue.config.productionTip = false
Vue.prototype.GLOBAL = globalVariable

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
