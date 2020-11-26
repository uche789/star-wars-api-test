<template>
  <div class="field">
    <div class="control">
      <input
        v-model="query"
        class="input"
        type="text"
        placeholder="Enter name"
      />
    </div>
    <button class="button is-info" @click="search">Search</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    query: ""
  }),
  methods: {
    search() {
      this.$emit("search", this.query);
    }
  }
});
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 600px;
  margin: auto;
}

.input {
  margin-left: 10px;
}
</style>
