<template>
  <div class="authProvider">
    <slot></slot>
  </div>
</template>

<script>
/**
 * Class used internally for FacebookProvider, TwitterProvider, etc.
 * Can also serve a purpose for providers not given custom provider
 * implementations, such as Microsoft or Yahoo.
 */
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
      const config = {
        provider: this.providerId
      };

      if (Object.keys(this.scopes).length) {
        config.scopes = Object.keys(this.scopes);
      }

      if (Object.keys(this.customParameters).length) {
        config.customParameters = this.customParameters;
      }

      if (this.providerName) config.providerName = this.providerName;
      if (this.buttonColor) config.buttonColor = this.buttonColor;
      if (this.iconUrl) config.iconUrl = this.iconUrl;

      return config;
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
    },

    providerName: {
      type: String,
      default: null
    },

    buttonColor: {
      type: String,
      default: null
    },

    iconUrl: {
      type: String,
      default: null
    }
  }
};
</script>
