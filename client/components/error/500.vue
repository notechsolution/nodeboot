<template>
  <div id="app" class="container" style="margin-top: 10%;">
    <h1>Server Error</h1>
    <pre>
  {{error}}
</pre>
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
      error: 'Oppos, Something went wrong at server...'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
