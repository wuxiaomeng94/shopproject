<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
    <Footer v-if="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import Footer from './components/Footer/Footer'
export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
/*#app {
  !*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*!
}*/
#app
  width 100%
  height 100%
  background #f5f5f5

</style>
