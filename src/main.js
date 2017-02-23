import Vue from 'vue'
import Store from './components/store.js'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex)
const store = new Vuex.Store(Store)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
