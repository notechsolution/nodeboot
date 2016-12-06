<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >


    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">{{user.username}}</h3>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-3 col-lg-3 " align="center"> <img alt="User Pic" src="http://babyinfoforyou.com/wp-content/uploads/2014/10/avatar-300x300.png" class="img-circle img-responsive"> </div>

          <div class=" col-md-9 col-lg-9 ">
            <table class="table table-user-information">
              <tbody>
              <tr>
                <td>Department:</td>
                <td>Programming</td>
              </tr>
              <tr>
                <td>User Name</td>
                <td>{{user.username}}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td><a href="{{user.email}}">{{user.email}}</a></td>
              </tr>
              <tr>
              <td>Roles</td>
              <td>{{user.roles}}
              </td>
              </tr>
              <tr>
                <td>Created</td>
                <td>{{user.created}}</td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<style>
   .user-row {
    margin-bottom: 14px;
}

.user-row:last-child {
    margin-bottom: 0;
}

.dropdown-user {
    margin: 13px 0;
    padding: 5px;
    height: 100%;
}

.dropdown-user:hover {
    cursor: pointer;
}

.table-user-information > tbody > tr {
    border-top: 1px solid rgb(221, 221, 221);
}

.table-user-information > tbody > tr:first-child {
    border-top: 0;
}


.table-user-information > tbody > tr > td {
    border-top: 0;
}
.toppad
{margin-top:100px;
background-color: #f6f6f6;
}

</style>
<script>
    export default{
        data(){
            return{
                user: window.user || {}
            }
        },
        components:{
        }
    }
</script>
