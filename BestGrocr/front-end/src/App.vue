<template>
  <div id="app">
    <!-- <LoginButtons /> -->
    <ItemsEntryComponent @item-added="refreshItems" />
    <ItemsViewComponent ref="itemsView" />
  </div>
  
</template>

<script>
// import LoginButtons from './components/LoginComponent.vue';
import ItemsEntryComponent from './components/ItemsEntryComponent.vue';
import ItemsViewComponent from './components/ItemsViewComponent.vue';

export default {
  name: 'App',
  components: {
    // LoginButtons,
    ItemsEntryComponent,
    ItemsViewComponent
  },
    methods: {
    refreshItems() {
      this.$refs.itemsView.fetchItems(); // Call fetchItems on ItemsViewComponent
    }
  }
};
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
