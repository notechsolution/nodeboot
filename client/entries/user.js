import Vue from 'vue'
import VueRouter from 'vue-router'
import Password from '../components/user/Password'
import UserProfile from '../components/user/UserProfile'
import MyHeader from '../components/index/MyHeader'
import MyFooter from '../components/index/MyFooter'

Vue.use(require('vue-resource'));
Vue.use(VueRouter);

var router = new VueRouter({hashbang: false})
router.map({
  '/': {
    component: UserProfile
  },
  '/password': {
    component: Password
  }
})

/* eslint-disable no-new */
// var app = new Vue({
//   components: { App,MyHeader,MyFooter,Password }
// })

Vue.component('UserProfile',UserProfile);
Vue.component('MyHeader',MyHeader);
Vue.component('MyFooter',MyFooter);
Vue.component('Password',Password);

// router.start(app, 'body')
var app = Vue.extend({})
router.start(app, 'body')

require('bootstrap/dist/css/bootstrap.css')
