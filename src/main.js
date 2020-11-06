import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import noImagePath from './assets/no-image.png'
import VueCarousel from 'vue-carousel';
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)
Vue.use(VueCarousel);
Vue.use(VueMaterial)
Vue.use(VueLodash, { name: 'loadash', lodash: lodash })
Vue.prototype.$noImagePath = noImagePath


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
