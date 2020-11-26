<template>
  <article class="message" :class="messageClass">
    <div class="message-header">
      <p>{{ title }}</p>
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
import Vue, { PropType } from "vue";

export enum MessageType {
  Error = "error",
  Success = "success",
  Warning = "warning",
  Info = "info"
}

const settings: Record<MessageType, { title: string; class: string }> = {
  [MessageType.Info]: {
    class: "is-info",
    title: "Info"
  },
  [MessageType.Error]: {
    class: "is-danger",
    title: "Error"
  },
  [MessageType.Warning]: {
    class: "is-warning",
    title: "Warning"
  },
  [MessageType.Success]: {
    class: "is-success",
    title: "Success"
  }
};

export default Vue.extend({
  props: {
    messageType: {
      type: String as PropType<MessageType>,
      default: MessageType.Info
    }
  },
  computed: {
    messageClass(): string {
      return settings[this.messageType].class;
    },
    title(): string {
      return settings[this.messageType].title;
    }
  }
});
</script>

<style lang="scss" scoped>
.message {
  max-width: 500px;
  margin: 20px auto;
}
</style>
