import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/fontawesome'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

<<<<<<< HEAD
Vue.config.productionTip = false

=======

Vue.config.productionTip = false


>>>>>>> 85526e5c703732a8c115ac4a5546642d938d78b4
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
