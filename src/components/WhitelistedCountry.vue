<template>
  <div class="whitelistedCountry"></div>
</template>

<script>
export default {
  name: "WhitelistedCountry",

  inject: ["addWhitelistedCountry", "removeWhitelistedCountry"],

  created() {
    this.addWhitelistedCountry(this.id);
  },

  beforeDestroy() {
    this.removeWhitelistedCountry(this.id);
  },

  watch: {
    id(newVal, oldVal) {
      if (newVal === oldVal) return;

      this.removeWhitelistedCountry(oldVal);
      this.addWhitelistedCountry(newVal);
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
