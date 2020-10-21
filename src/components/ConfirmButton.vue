<template>
  <input v-if="!confirm" :class="classes" type="button" :value="text" @click="startConfirm" />
  <input v-else :class="classes" type="button" @click="confirmed" value="Confirm" />
</template>

<script>
  export default {
    data() {
      return {
        confirm: false
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
      startConfirm() {
        this.confirm = true;
        setTimeout(() => {
          this.confirm = false;
        }, 3000);
      },
      confirmed() {
        this.$emit('confirmed');
        this.confirm = false;
      }
    }
  };
</script>