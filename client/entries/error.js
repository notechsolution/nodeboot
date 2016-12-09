import Vue from 'vue'
import MyHeader from '../components/index/MyHeader'
import MyFooter from '../components/index/MyFooter'
import Error500 from '../components/error/500'
import Error400 from '../components/error/400'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { MyHeader,MyFooter,
  error_500:Error500, error_400:Error400}
})

require('bootstrap/dist/css/bootstrap.css')
require('../assets/css/index.css')
