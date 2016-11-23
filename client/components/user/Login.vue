<template>
  <div class="user-modal-container" :class="{ 'active': active }" id="login-modal" @click="close">
    <div class="user-modal">
      <ul class="form-switcher">
        <li @click="flip('register', $event)"><a href="" id="register-form" :class="{ 'active': active == 'register' }">Register</a>

        </li>
        <li @click="flip('login', $event)"><a href="" id="login-form" :class="{ 'active': active == 'login' }">Login</a>

        </li>
      </ul>
      <div class="form-register" :class="{ 'active': active == 'register' }" id="form-register">
        <div class="error-message" v-text="registerError"></div>
        <input type="text" name="name" placeholder="User Name" v-model="registerName" @keyup.enter="submit('register', $event)">
        <input type="email" name="email" placeholder="Email" v-model="registerEmail" @keyup.enter="submit('register', $event)">
        <input type="password" name="password" placeholder="Password" v-model="registerPassword" @keyup.enter="submit('register', $event)">
        <input type="submit" :class="{ 'disabled': submitted == 'register' }" @click="submit('register', $event)" v-model="registerSubmit" id="registerSubmit">
        <div class="links"> <a href="" @click="flip('login', $event)">Already have an account?</a>

        </div>
      </div>
      <div class="form-login" :class="{ 'active': active == 'login' }" id="form-login">
        <div class="error-message" v-text="loginError"></div>
        <input type="text" name="user" placeholder="Email or Username" v-model="loginUsernameOrEmail" @keyup.enter="submit('login', $event)">
        <input type="password" name="password" placeholder="Password" v-model="loginPassword" @keyup.enter="submit('login', $event)">
        <input type="submit" :class="{ 'disabled': submitted == 'login' }" @click="submit('login', $event)" v-model="loginSubmit" id="loginSubmit">
        <div class="links"> <a href="" @click="flip('password', $event)">Forgot your password?</a>

        </div>
      </div>
      <div class="form-password" :class="{ 'active': active == 'password' }" id="form-password">
        <div class="error-message" v-text="passwordError"></div>
        <input type="text" name="email" placeholder="Email" v-model="passwordEmail" @keyup.enter="submit('password', $event)">
        <input type="submit" :class="{ 'disabled': submitted == 'password' }" @click="submit('password', $event)" v-model="passwordSubmit" id="passwordSubmit">
      </div>
    </div>
  </div>
</template>
<script>
  var modal_submit_register = 'Register';
  var modal_submit_password = 'Reset Password';
  var modal_submit_login = 'Login';

  export default{
    data(){
      return{
        submitted: null,

        // Submit button text
        registerSubmit: modal_submit_register,
        passwordSubmit: modal_submit_password,
        loginSubmit: modal_submit_login,

        // Modal text fields
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        loginUsernameOrEmail: '',
        loginPassword: '',
        passwordEmail: '',

        // Modal error messages
        registerError: '',
        loginError: '',
        passwordError: ''
      }
    },
    methods: {
      close: function(e) {
        e.preventDefault();
        if (e.target === this.$el) {
          this.active = null;
        }
      },
      flip: function(which, e) {
        e.preventDefault();
        if (which !== this.active) {
          this.active = which;
        }
      },
      submit: function(which, e) {
        e.preventDefault();
        this.submitted = which
        var data = {
          form: which
        };
        switch (which) {
          case 'register':
            data.username = this.registerName;
            data.email = this.registerEmail;
            data.password = this.registerPassword;
            this.registerSubmit= 'Registering...';
            // GET /someUrl
                this.$http.post('/api/auth/signup',data).then((response) => {
                  // success callback
                this.active = 'login';
                this.registerSubmit= modal_submit_register;
            }, (response) => {
              console.log("signup failed due to :"+response);
              this.registerSubmit= modal_submit_register;
            });

            break;
          case 'login':
            data.usernameOrEmail = this.loginUsernameOrEmail;
            data.password = this.loginPassword;
            this.loginSubmit='Logging In...';

        // GET /someUrl
          this.$http.post('/api/auth/signin',data).then((response) => {
            // success callback

          this.active = null;
          this.user = response.body;
          window.user = response.body;
          console.log('sign in | sucess | '+ JSON.stringify(this.user));
        }, (response) => {
            console.log('failed sign in |'+response);
            this.loginSubmit= modal_submit_login;
          });

            break;
          case 'password':
            data.username = this.passwordEmail;
            this.passwordSubmit = 'Resetting Password...'
            this.$http.post('/api/auth/forgot',data).then((response) => {
                        // success callback
                        console.log('reset password | success');
                      this.active = 'login';
                    }, (response) => {
                        console.log('failed reset password |'+response);
                        this.loginSubmit= modal_submit_password;
                    });
            break;
        }

      }
    },
    props: ['active','user']
  }
</script>

<style>
  .user-modal-container * {
    box-sizing: border-box;
  }

  .user-modal-container {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    visibility: hidden;
    cursor: pointer;
    overflow-y: auto;
    z-index: 3;
    font-family: 'Lato', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif';
    font-size: 14px;
    background-color: rgba(17, 17, 17, .9);
    -webkit-transition: all 0.25s linear;
    -moz-transition: all 0.25s linear;
    -o-transition: all 0.25s linear;
    -ms-transition: all 0.25s linear;
    transition: all 0.25s linear;
  }

  .user-modal-container.active {
    opacity: 1;
    visibility: visible;
  }

  .user-modal-container .user-modal {
    position: relative;
    margin: 50px auto;
    width: 90%;
    max-width: 500px;
    background-color: #f6f6f6;
    cursor: initial;
  }

  .user-modal-container .form-login,
  .user-modal-container .form-register,
  .user-modal-container .form-password {
    padding: 75px 25px 25px;
    display: none;
  }

  .user-modal-container .form-login.active,
  .user-modal-container .form-register.active,
  .user-modal-container .form-password.active {
    display: block;
  }

  .user-modal-container ul.form-switcher {
    margin: 0;
    padding: 0;
  }

  .user-modal-container ul.form-switcher li {
    list-style: none;
    display: inline-block;
    width: 50%;
    float: left;
    margin: 0;
  }

  .user-modal-container ul.form-switcher li a {
    width: 100%;
    display: block;
    height: 50px;
    line-height: 50px;
    color: #666666;
    background-color: #dddddd;
    text-align: center;
  }

  .user-modal-container ul.form-switcher li a.active {
    color: #000000;
    background-color: #f6f6f6;
  }

  .user-modal-container input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #eeeeee;
  }

  .user-modal-container input[type="submit"] {
    color: #f6f6f6;
    border: 0;
    margin-bottom: 0;
    background-color: #3fb67b;
    cursor: pointer;
  }

  .user-modal-container input[type="submit"]:hover {
    background-color: #3aa771;
  }

  .user-modal-container input[type="submit"]:active {
    background-color: #379d6b;
  }

  .user-modal-container .links {
    text-align: center;
    padding-top: 25px;
  }

  .user-modal-container .links a {
    color: #3fb67b;
  }

  .user-modal-container input[type="submit"].disabled {
    background-color: #98d6b7;
  }

</style>

