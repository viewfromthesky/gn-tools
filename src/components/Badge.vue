<template>
  <div
    class="badge"
    :style="{ backgroundColor: computedColor, color: dark ? '#fff' : '' }"
  >
    {{ value }}
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: "calm"
    },
    dark: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedColor: {
      get() {
        switch (this.color) {
          case "calm":
            return "#6befce";
          case "warning":
            return "#f7390e";
          case "dark":
            return "#2c3e50";
          default:
            return this.color;
        }
      }
    }
  }
};
</script>

<style scoped>
div {
  border-radius: 1em;
  display: inline-block;
  padding: 0.2em 0.6em 0.1em 0.6em;
}
</style>
