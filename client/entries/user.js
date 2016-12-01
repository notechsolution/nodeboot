import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../components/App'
import Password from '../components/user/Password'
import MyHeader from '../components/index/MyHeader'
import MyFooter from '../components/index/MyFooter'

Vue.use(require('vue-resource'));
Vue.use(VueRouter);

const router = new VueRouter({
  base: __dirname,
  routes: [
    { path: '/', component: App },
    { path: '/password', component: Password }
  ]
})

/* eslint-disable no-new */
new Vue({
  router,
  el : "body",
  components: { App,MyHeader,MyFooter,Password }
})

require('bootstrap/dist/css/bootstrap.css')
