<template>
  <div id="app">
    <LoginButtons />
    <DbItems />
  </div>
  
</template>

<script>
import LoginButtons from './components/LoginButtons.vue';
import DbItems from './components/DbItems.vue';

export default {
  name: 'App',
  components: {
    LoginButtons,
    DbItems
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
