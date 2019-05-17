<template>
    <Login/>
</template>

<script>
import Login from './components/Login'

export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style>
body {
  background-image: url("assets/images/1.jpg");
  /* background-image: url("../assets/images/ocean.jpg"); */
  /* background-image: url("../assets/images/background.jpg");  */
  background-size: cover;
  overflow: hidden;
}
</style>
