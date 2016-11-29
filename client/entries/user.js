import Vue from 'vue'
import App from '../components/App'
import MyHeader from '../components/index/MyHeader'
import MyFooter from '../components/index/MyFooter'
Vue.use(require('vue-resource'));

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App,MyHeader,MyFooter }
})

require('bootstrap/dist/css/bootstrap.css')
