import Vue from 'vue'
import Home from '../components/index/Home'
import MyHeader from '../components/index/MyHeader'
import MyFooter from '../components/index/MyFooter'

Vue.use(require('vue-resource'));

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { Home,MyHeader,MyFooter }
})

require('bootstrap/dist/css/bootstrap.css')
require('../assets/css/index.css')
