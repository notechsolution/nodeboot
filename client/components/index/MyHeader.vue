<template>
  <div id="header">
    <navbar placement="top" type="default">
      <!-- Brand as slot -->
      <a slot="brand" href="/" title="Home" class="navbar-brand nodeboot-logo">
        <img src="../../assets/image/logo-notech-nodeboot.png" class="nodeboot-logo">
      </a>

      <!-- You can use dropdown component -->
      <template v-for='menu in menuItems'>

        <dropdown v-if='!menu.type || menu.type=="dropdown"'>
          <a slot="button" href="javascript:void(0)">
            <span>{{menu.title}}</span>
            <i class="glyphicon glyphicon-menu-down"></i>
          </a>

          <li v-for='subMenu in menu.subMenus'>
            <a href="{{subMenu.href}}">{{subMenu.title}}</a>
          </li>
        </dropdown>

        <ul class="nav navbar-nav"  v-if='menu.type=="link"'>
          <li class="dropdown"> <a href="{{menu.href}}">{{menu.title}}</a></li>
        </ul>


      </template>


      <li slot="right" v-if="!isLogin()">
        <a href="#" @click="openLoginModal('login')">Login</a>
      </li>

      <li slot="right" v-if="!isLogin()">
        <a href="#" @click="openLoginModal('register')">Register</a>
      </li>

      <dropdown slot='right' v-if="isLogin()">
      <a slot="button" href="javascript:void(0)">
        <i class="glyphicon glyphicon-align-justify"></i>
        <span>&nbsp;Welcome,</span>
        <span class="header-user-name">{{user.username}}</span>
      </a>
      <ul slot="dropdown-menu" class="dropdown-menu">
        <li><a href="/users#/">User Profile</a></li>
        <li><a href="/users#/password">Change Password</a></li>
        <li><a href="/api/auth/signout">Logout</a></li>
        </ul>
      </dropdown>

      <li slot="right" class='fork-me-at-github'>
        <a href="https://github.com/notechsolution/nodeboot">
          <img style="position: absolute; top: 0; right: 0; border: 0;" src="../../assets/image/fork-me-github.png"
               alt="Fork me on GitHub"
               data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png">
        </a>
      </li>


    </navbar>
    <Login v-bind:active.sync="activeModel" v-bind:user.sync="user" v-bind:menu-items.sync ="menuItems"></Login>
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
  ready(){
  // TODO: below statement is to remove the paddingTop when there is forkme image extend the div offsetHeight.
  // Please do remove them if you haven't such image
    document.body.style.paddingTop = '0';
  },

  data(){
    return {
    activeModel:null,
    user : window.user || {},
    menuItems: window.menuItems || []
    }
  },
  methods: {
      openLoginModal: function (which) {
      this.activeModel = which;
    },
     isLogin : function(){
      return user && user.username!='' && user.username!=null;
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

.header-user-name {
    text-decoration: underline !important;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    vertical-align: top;
}

</style>
