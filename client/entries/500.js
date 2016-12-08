import Vue from 'vue'
import MyHeader from '../components/index/MyHeader'
import MyFooter from '../components/index/MyFooter'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { MyHeader,MyFooter }
})

require('bootstrap/dist/css/bootstrap.css')
require('../assets/css/index.css')
