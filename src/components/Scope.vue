<template>
  <div class="authScope"></div>
</template>

<script>
export default {
  name: "Scope",

  inject: ["addScope", "removeScope"],

  created() {
    this.addScope(this.name);
  },

  watch: {
    name(newVal, oldVal) {
      if (newVal === oldVal) return;

      this.removeScope(this.oldVal);
      this.addScope(this.newVal);
    }
  },

  beforeDestroy() {
    this.removeScope(this.name);
  },

  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>
