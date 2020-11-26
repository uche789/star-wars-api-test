<template>
  <nav class="pagination" role="navigation" aria-label="pagination">
    <a
      class="pagination-previous"
      :disabled="!previous"
      @click="selected($event, previous)"
      >Previous</a
    >
    <a class="pagination-next" :disabled="!next" @click="selected($event, next)"
      >Next page</a
    >
    <div class="additional"><slot /></div>
  </nav>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    previous: {
      type: String as PropType<string | null>,
      default: null
    },
    next: {
      type: String as PropType<string | null>,
      default: null
    }
  },
  methods: {
    selected(event: MouseEvent, value: string) {
      if ((event.target as HTMLElement).getAttribute("disabled")) {
        return;
      }

      this.$emit("selected", value);
    }
  }
});
</script>

<style lang="scss" scoped>
.pagination {
  max-width: 400px;
  margin: auto;
}

@media screen and (max-width: 768px) {
  .additional {
    flex: 0 0 100%;
  }
}
</style>
