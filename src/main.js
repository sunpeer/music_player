import Vue from 'vue'
import App from './App.vue'
import router from './router'
import bus from 'vue-bus'
import store from './store'

Vue.config.productionTip = false
Vue.use(bus)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
