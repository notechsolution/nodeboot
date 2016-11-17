import Vue from 'vue'
import Home from '../components/index/Home'
Vue.use(require('vue-resource'));

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { Home }
})

require('bootstrap/dist/css/bootstrap.css')
require('../assets/css/index.css')
