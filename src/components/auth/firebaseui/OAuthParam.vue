<template>
  <div class="authParam"></div>
</template>

<script>
export default {
  name: "OAuthParam",

  inject: ["addParam", "removeParam"],

  created() {
    this.addParam(this.name, this.val);
  },

  watch: {
    name(newVal, oldVal) {
      if (newVal === oldVal) return;

      this.removeParam(this.oldVal);
      this.addParam(this.newVal, this.val);
    },

    val(newVal, oldVal) {
      if (newVal === oldVal) return;

      this.addParam(this.name, newVal);
    }
  },

  beforeDestroy() {
    this.removeParam(this.name);
  },

  props: {
    name: {
      type: String,
      required: true
    },

    val: {
      type: String,
      required: true
    }
  }
};
</script>
