<template>
  <div class="modal is-active" v-if="show">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"><slot name="title" /></p>
        <button
          class="delete"
          aria-label="close"
          @click="$emit('close')"
        ></button>
      </header>
      <section class="modal-card-body">
        <slot name="body" />
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style lang="scss" scoped>
.modal-card-foot {
  justify-content: flex-end;
}
</style>
