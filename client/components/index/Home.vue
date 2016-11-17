<template>
  <div id="app" class="container-fluid">
    <my-header></my-header>

    <!-- Carousel
   ================================================== -->
    <div class="bs-example">
      <carousel>
        <slider>
          <img src="https://placehold.it/1200x500?text=one">
          <div class="carousel-caption">
            <h3>Slide #1</h3>
            <p>sunt in culpa qui officia deserunt mollit a.</p>
          </div>
        </slider>
        <slider>
          <img src="https://placehold.it/1200x500?text=two">
          <div class="carousel-caption">
            <h3>Slide #2</h3>
            <p>sunt in culpa qui officia deserunt mollit a.</p>
          </div>
        </slider>
        <slider>
          <img src="https://placehold.it/1200x500?text=three">
          <div class="carousel-caption">
            <h3>Slide #3</h3>
            <p>sunt in culpa qui officia deserunt mollit a.</p>
          </div>
        </slider>
      </carousel>
    </div><!-- /.carousel -->

    <hr class="featurette-divider">
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
