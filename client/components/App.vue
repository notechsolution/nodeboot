<template>
  <div id="app">
    <img class="logo" src="../assets/logo.png">
    <hello></hello>
    <p>
      Welcome to your Node.js kickstart app!
    </p>
    <p>
      To get a better understanding of how this boilerplate works, check out
      <a href="http://vuejs-templates.github.io/webpack" target="_blank">its documentation</a>.
      It is also recommended to go through the docs for
      <a href="http://webpack.github.io/" target="_blank">Webpack</a> and
      <a href="http://vuejs.github.io/vue-loader/" target="_blank">vue-loader</a>.
      If you have any issues with the setup, please file an issue at this boilerplate's
      <a href="https://github.com/vuejs-templates/webpack" target="_blank">repository</a>.
    </p>
    <p>
      You may also want to checkout
      <a href="https://github.com/vuejs/vue-router/" target="_blank">vue-router</a> for routing and
      <a href="https://github.com/vuejs/vuex/" target="_blank">vuex</a> for state management.
    </p>
    <br/>
    <div id="fake-nav">
      <a href="#register" @click="openLoginModal('register', $event)">Register</a>
      <a href="#login" @click="openLoginModal('login', $event)">Login</a>
    </div>
    <Login v-bind:active="activeModal"></Login>
  </div>
</template>

<script>
import Hello from './Hello'
import Login from './user/Login'
export default {
  components: {
    Hello,
    Login
  },
  data(){
    return {

    }
  },
  methods: {
    openLoginModal: function (which, e) {
      console.log(JSON.stringify(which))
      e.preventDefault();
      this.activeModal = which;
    }
  }
}

</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -200px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
