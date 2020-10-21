<template>
  <input v-if="!confirm" :class="classes" type="button" :value="text" @click="confirm = true" />
  <input v-else class="confirm" type="button" @click="confirmed" @mouseover="clearConfirmTimeout" @mouseout="startConfirmTimeout" value="Confirm" />
</template>

<script>
  export default {
    data() {
      return {
        confirm: false,
        confirmTimer: null
      }
    },
    props: {
      text: {
        type: String,
        default: ''
      },
      classes: {
        type: Array,
        default: () => ([])
      }
    },
    methods: {
      startConfirmTimeout() {
        this.confirmTimer = setTimeout(() => {
          this.confirm = false;
        }, 2000);
      },
      clearConfirmTimeout() {
        clearTimeout(this.confirmTimer);
      },
      confirmed() {
        this.$emit('confirmed');
        this.confirm = false;
      }
    }
  };
</script>

<style scoped>
  input[type="button"].confirm {
    background-color: #ffdd00;
    border-color: #ffdd00;
  }
  
  input[type="button"].confirm:hover {
    border-color: #ddae11;
  }
  
  input[type="button"].confirm:active {
    background-color: #ddae11;
  }
</style>