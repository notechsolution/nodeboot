<template>
  <div class="user-modal-container active" id="password-modal">

    <div class="user-modal">

      <div class="page-header">
        <h3>Reset Password
        </h3>
      </div>

      <div class="form-password" :class="{ 'active': active == 'password' }"  id="form-password">
        <div class="alert alert-danger" role="alert" v-text="passwordError" v-if="passwordError"></div>
        <input type="password" name="email" placeholder="Current Password" v-model="currentPassword" v-if="token==null">
        <input type="password" name="email" placeholder="New Password" v-model="newPassword">
        <input type="password" name="email" placeholder="Confirm New Password" v-model="verifyPassword" @blur="verifyConfirmPassword">
        <input type="submit" :class="{ 'disabled': submitted == 'password' }" @click="submit('password', $event)"
               v-model="passwordSubmit" id="passwordSubmit">
      </div>

      <div class="form-password" :class="{ 'active': active == 'success' }"  id="success">

        <div class="alert alert-success" role="alert">Your password have been changed successfully. </div>
        <button type="button" class="btn btn-success btn-lg btn-block">
          <a href="/">Home</a>
        </button>
      </div>

    </div>
  </div>
</template>
<script>
  var modal_submit_password = 'Reset Password';
  var modal_submitting_password = 'Resetting Password......';

  export default{
    data(){
      return{
        // Submit button text
        passwordSubmit: modal_submit_password,

        // Modal text fields
        currentPassword: '',
        newPassword: '',
        verifyPassword: '',
        submitted : '',
        active :'password',
        // Modal error messages
        passwordError: ''
      }
    },
    methods: {
      verifyConfirmPassword: function(){
        if(!this.verifyPassword){
          this.passwordError = "Please input confirm password"
          return;
        }
        if(this.verifyPassword!=this.newPassword){
          this.passwordError = "Confirm password should be aligned with new password"
            return;
        }
      },
      submit: function(which, e) {
        e.preventDefault();
        this.submitted = which
        var data = {
          form: which
        };
        switch (which) {
          case 'password':
            data.currentPassword = this.currentPassword;
            data.newPassword = this.newPassword;
            data.verifyPassword = this.verifyPassword;
            this.passwordSubmit = 'Resetting Password...';
            if(!this.token){
             // change password
             this.$http.post('/api/users/password',data).then((response) => {
                        // success callback
                        console.log('change password | success');
                       this.passwordSubmit = "";
                       this.active = 'success';
                    }, (response) => {
                        console.log('failed reset password |'+response.body.message);
                        this.passwordError = response && response.body.message;
                        this.passwordSubmit= modal_submit_password;
                        this.submitted = "";
                    });
            } else{
              // reset password
              this.$http.post('/api/auth/reset/'+this.token,data).then((response) => {
                          // success callback
                          console.log('reset password | success');
                        window.location = "/"
                      }, (response) => {
                          console.log('failed reset password |'+response.body.message);
                          this.passwordError = response && response.body.message;
                          this.passwordSubmit = modal_submit_password;
                          this.submitted = "";
                      });
            }

            break;
        }

      }
    },
    props: ['token']
  }

</script>

<style scoped>
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
    margin: 150px auto;
    width: 90%;
    max-width: 500px;
    background-color: #f6f6f6;
    cursor: initial;
  }

  .user-modal-container .form-login,
  .user-modal-container .form-register,
  .user-modal-container .form-password {
    padding: 0 25px 25px;
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

