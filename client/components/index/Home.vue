<template>
  <div id="app" class="container-fluid">

    <!-- Carousel
   ================================================== -->
    <div class="bs-example">
      <carousel interval=6500>
        <slider>
          <div style="position:relative;">
            <div id='particles-js'>
            </div>
              <img src="../../assets/image/stars.png" class="slider-img">
              <div class="carousel-caption">
                <h3>NodeBootJS</h3>
                <p>An complete Node.js tech stack, Vuejs, Nodejs, Express, MongoDB</p>
              </div>
        </div>
        </slider>
        <slider>
          <img src="../../assets/image/boot.png">
          <div class="carousel-caption">
            <h3>Enterprise Starter</h3>
            <p>Empower your enterprise application ready from beginning</p>
          </div>
        </slider>
        <slider>
          <img src="../../assets/image/opensource.png">
        </slider>

      </carousel>
    </div><!-- /.carousel -->

  </div>
</template>

<script>
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'
import { carousel,slider  } from 'vue-strap'
import particles from 'particles.js'
import particlesJSON from './particles-config.js'

export default {
  components: {
    MyHeader,
    MyFooter,
    carousel,
    slider
  },
  ready (){
    this.loadParticles();
  },

  data(){
    return {
      activeLoginModal:false
    }
  },
  methods: {
    loadParticles : function(){
     particlesJS('particles-js',particlesJSON);
}
  }
}

</script>

<style>
  #app {
  color: #2c3e50;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 6%;
  font-family: Source Sans Pro, Helvetica, sans-serif;
}

.bs-example {
    margin-bottom: 0;
}
.slider-img {
    width: 100%;
    height: 100%;
}

#particles-js {
  position:absolute;
  width:100%;
}
</style>
