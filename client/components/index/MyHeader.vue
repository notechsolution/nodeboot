<template>
  <div id="header">
    <navbar placement="top" type="default">
      <!-- Brand as slot -->
      <a slot="brand" href="/" title="Home" class="navbar-brand">VueStrap</a>
      <!-- You can use dropdown component -->
      <dropdown text="Dropdown">
        <li><a href="link">Option</a></li>
      </dropdown>

      <!-- For right positioning use slot -->
      <li slot="right">
        <a href="#" @click="openLoginModal">Login</a>
      </li>

      <li slot="right">
        <a href="https://github.com/yuche/vue-strap" target="_blank">Fork...</a>
      </li>


    </navbar>
    <Login v-bind:active="activeModel"></Login>
  </div>
</template>

<script>
import { navbar,dropdown  } from 'vue-strap'
import Login from '../user/Login'
export default {
  components: {
  navbar,
  dropdown,
  Login
  },
  data(){
    return {
    activeModel:null
    }
  },
  methods: {
      openLoginModal: function () {
      this.activeModel = 'login';
    }
  }
}

</script>

<style>

</style>
