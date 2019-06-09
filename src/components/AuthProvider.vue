<template>
  <div class="authProvider">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CustomProvider",

  inject: ["firebase", "updateProvider", "removeProvider"],

  provide() {
    return {
      addScope: this.addScope,
      removeScope: this.removeScope,
      addParam: this.addParam,
      removeParam: this.removeParam
    };
  },

  methods: {
    addScope(newScope) {
      this.$set(this.scopes, newScope, true);
    },

    removeScope(scope) {
      this.$delete(this.scopes, scope);
    },

    addParam(key, val) {
      this.$set(this.customParameters, key, val);
    },

    removeParam(key) {
      this.$delete(this.customParameters, key);
    }
  },

  data() {
    return {
      scopes: {},
      customParameters: {}
    };
  },

  computed: {
    config() {
      return {
        provider: this.providerId,
        scopes: Object.keys(this.scopes),
        customParameters: this.customParameters
      };
    }
  },

  created() {
    this.updateProvider(this.config.provider, this.config);
  },

  watch: {
    config(newVal, oldVal) {
      if (newVal === oldVal) return;

      this.updateProvider(this.config.provider, this.config);
    }
  },

  beforeDestroy() {
    this.removeProvider(this.config.provider);
  },

  props: {
    providerId: {
      type: String,
      required: true
    }
  }
};
</script>
