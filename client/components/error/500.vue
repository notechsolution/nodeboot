<template>
  <div class="container">
    <div class="row hero-unit">
      <div class="col-md-2">
        <img src="../../assets/image/emotiguy.png" class="emotion">
      </div>
      <div class="col-md-10">
        <div class=" center">

          <h1>Server Error <small><font face="Tahoma" color="red">Error 500</font></small></h1>
          <br />
          <p>Sorry that the system is crazy now, either contact your webmaster or try again. </p>
          <p>Use your browsers <b>Back</b> button to navigate to the page you have previously come from</p>
          <p><b>Or you could just press this neat little button:</b></p>
          <a href="/" class="btn btn-large btn-info"><i class="glyphicon glyphicon-home"></i> &nbsp;&nbsp;Take Me Home</a>
        </div>
        <br />
        <!-- By ConnerT HTML & CSS Enthusiast -->
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      error: 'Oppos, We can not find the page you want...'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .center {text-align: center; margin-left: auto; margin-right: auto; margin-bottom: auto; margin-top: auto;}
 .hero-unit {
 margin-top:10%;
   padding: 60px;
  margin-bottom: 30px;
  font-size: 18px;
  font-weight: 200;
  line-height: 30px;
  color: inherit;
  background-color: #eeeeee;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
 }

 .hero-unit h1 {
   margin-bottom: 0;
  font-size: 60px;
  line-height: 1;
  color: inherit;
  letter-spacing: -1px;
  }
  .emotion {
    margin-left: -200px;
    margin-top: -100px;
    margin-right: 30px;
  }
</style>
