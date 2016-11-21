<template>
  <div id="app" class="container-fluid">
    <my-header></my-header>

    <!-- Carousel
   ================================================== -->
    <div class="bs-example">
      <carousel>
        <slider>
          <img src="../../assets/image/one.png">
          <div class="carousel-caption">
            <h3>Nodejs Stack</h3>
            <p>An complete Node.js tech stack, Vuejs, Nodejs, Express, MongoDB</p>
          </div>
        </slider>
        <slider>
          <img src="../../assets/image/two.png">
          <div class="carousel-caption">
            <h3>Enterprise Starter</h3>
            <p>It purpose is to make your enterprise application ready from beginning</p>
          </div>
        </slider>
        <slider>
          <img src="../../assets/image/three.png">
          <div class="carousel-caption">
            <h3>MIT License</h3>
            <p>NodeBoot.JS is an open source project with MIT license</p>
          </div>
        </slider>

      </carousel>
    </div><!-- /.carousel -->

    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'
import { carousel,slider  } from 'vue-strap'
export default {
  components: {
    MyHeader,
    MyFooter,
    carousel,
    slider
  },
  data(){
    return {
      activeLoginModal:false
    }
  },
  methods: {

  }
}

</script>

<style>
  #app {
  color: #2c3e50;
  margin-left: 10%;
  margin-right: 10%;
  font-family: Source Sans Pro, Helvetica, sans-serif;
}

.bs-example {
    margin-bottom: 0;
}
</style>
