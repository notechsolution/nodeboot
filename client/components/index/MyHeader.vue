<template>
  <div id="header">
    <navbar placement="top" type="default">
      <!-- Brand as slot -->
      <a slot="brand" href="/" title="Home" class="navbar-brand nodeboot-logo">
        <img src="../../assets/image/logo-notech-nodeboot.png" class="nodeboot-logo">
      </a>

      <!-- You can use dropdown component -->
      <dropdown text="Dropdown">
        <li><a href="link">Option</a></li>
      </dropdown>

      <!-- For right positioning use slot -->
      <li slot="right">
      <a href="#" @click="openLoginModal('login')">Login</a>
    </li>

      <li slot="right">
        <a href="#" @click="openLoginModal('register')">Register</a>
      </li>

      <li slot="right" class='fork-me-at-github'>
        <a href="https://github.com/notechsolution/nodeboot">
          <img style="position: absolute; top: 0; right: 0; border: 0;" src="../../assets/image/fork-me-github.png" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png">
        </a>
      </li>


    </navbar>
    <Login v-bind:active.sync="activeModel"></Login>
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
      openLoginModal: function (which) {
      this.activeModel = which;
    }
  }
}

</script>

<style>
.nodeboot-logo {
     padding: 1px 5px !important;
}

.nodeboot-logo img {
 width: 120px;
 height: 50px;
}

.fork-me-at-github {
  margin-left:100px;
 }

</style>
