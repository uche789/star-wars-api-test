<template>
  <article class="message is-danger">
    <div class="message-header">
      <p>Error</p>
      <button
        class="delete"
        @click="$emit('close')"
        aria-label="delete"
      ></button>
    </div>
    <div class="message-body">
      <slot name="body" />
    </div>
  </article>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.message {
  max-width: 500px;
  margin: 20px auto;
}
</style>
