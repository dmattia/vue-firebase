<template>
  <div class="blacklistedCountry"></div>
</template>

<script>
export default {
  name: "BlacklistedCountry",

  inject: ["addBlacklistedCountry", "removeBlacklistedCountry"],

  created() {
    this.addBlacklistedCountry(this.id);
  },

  beforeDestroy() {
    this.removeBlacklistedCountry(this.id);
  },

  watch: {
    id(newVal, oldVal) {
      if (newVal === oldVal) return;

      this.removeBlacklistedCountry(oldVal);
      this.addBlacklistedCountry(newVal);
    }
  },

  props: {
    id: {
      type: String,
      required: true
    }
  }
};
</script>
