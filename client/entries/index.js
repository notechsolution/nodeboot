import Vue from 'vue'
import App from '../components/App'
Vue.use(require('vue-resource'));

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
