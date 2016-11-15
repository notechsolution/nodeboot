import Vue from 'vue'
import Password from '../components/user/Password.vue'
Vue.use(require('vue-resource'));

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { Password }
})

require('bootstrap/dist/css/bootstrap.css')
