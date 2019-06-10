<template>
  <div class="recaptcha"></div>
</template>

<script>
export default {
  name: "Recaptcha",

  inject: ["setCaptcha"],

  created() {
    this.setCaptcha(this.config);
  },

  beforeDestroy() {
    this.setCaptcha({});
  },

  watch: {
    config(newVal, oldVal) {
      if (newVal === oldVal) return;

      this.setCaptcha(newVal);
    }
  },

  computed: {
    config() {
      return {
        type: this.type,
        size: this.size,
        badge: this.badge
      };
    }
  },

  props: {
    type: {
      type: String,
      default: "image",
      validator(val) {
        return ["image", "audio"].indexOf(val) !== -1;
      }
    },

    size: {
      type: String,
      default: "normal",
      validator(val) {
        return ["normal", "invisible", "compact"].indexOf(val) !== -1;
      }
    },

    badge: {
      type: String,
      default: "bottomleft",
      validator(val) {
        const options = new Set(["bottomleft", "bottomright", "inline"]);
        return options.has(val);
      }
    }
  }
};
</script>
