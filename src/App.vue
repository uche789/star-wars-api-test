<template>
  <div id="app">
    <h1 class="title">SWAPI</h1>
    <h2 class="subtitle">The Star Wars API</h2>
    <People />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import People from "./components/People.vue";

export default Vue.extend({
  name: "App",
  components: {
    People
  },
  data: () => ({
    showModal: false
  })
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
