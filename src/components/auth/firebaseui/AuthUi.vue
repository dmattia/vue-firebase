<template>
  <div id="authui">
    <slot></slot>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import * as firebaseui from "firebaseui";

import "firebaseui/dist/firebaseui.css";

export default {
  name: "AuthUi",

  inject: ["firebaseApp"],

  data() {
    return {
      config: this.setInitialConfig(),
      providerDict: {},
      customOptions: {},
      ui: new firebaseui.auth.AuthUI(this.firebaseApp.auth(), this.firebaseApp.name)
    };
  },

  methods: {
    updateProvider(provider, newVal) {
      this.$set(this.providerDict, provider, newVal);
    },

    removeProvider(provider) {
      this.$delete(this.providerDict, provider);
    },

    setCustomOptions(provider, options) {
      this.$set(this.customOptions, provider, options);
    },

    setInitialConfig() {
      const config = {
        callbacks: {},
        signInFlow: this.signInFlow,
        tosUrl: this.tosUrl,
        privacyPolicyUrl: this.privacyPolicyUrl
      };

      if (this.signInFlow) config.signInFlow = this.signInFlow;

      if (this.signInSuccessWithAuthResult) {
        config.callbacks.signInSuccessWithAuthResult = this.signInSuccessWithAuthResult;
      }

      if (this.signInFailure) {
        config.callbacks.signInFailure = this.signInFailure;
      }

      if (this.uiShown) config.callbacks.uiShown = this.uiShown;

      return config;
    }
  },

  computed: {
    providers() {
      return Object.keys(this.providerDict).map(providerId => {
        const provider = {
          provider: providerId,
          ...this.providerDict[providerId],
          ...this.customOptions[providerId]
        };

        if (Object.keys(provider).length === 1) {
          return providerId;
        }

        return provider;
      });
    },

    joinedConfig() {
      return {
        ...this.config,
        signInOptions: this.providers
      };
    }
  },

  mounted() {
    this.ui.start("#firebaseui-auth-container", this.joinedConfig);
  },

  provide() {
    return {
      authConfig: this.config,
      updateProvider: this.updateProvider,
      removeProvider: this.removeProvider,
      setCustomOptions: this.setCustomOptions
    };
  },

  watch: {
    joinedConfig(newVal, oldVal) {
      if (newVal === oldVal) return;

      this.ui.reset();
      this.ui.start("#firebaseui-auth-container", this.joinedConfig);
    }
  },

  props: {
    queryParameterForSignInSuccessUrl: {
      type: String,
      default: "signInSuccessUrl"
    },

    queryParameterForWidgetMode: {
      type: String,
      default: "mode"
    },

    signInFlow: {
      type: String,
      default: "redirect"
    },

    immediateFederatedRedirect: {
      type: Boolean,
      default: false
    },

    signInSuccessUrl: {
      type: String,
      default: null
    },

    tosUrl: {
      type: String,
      required: true
    },

    privacyPolicyUrl: {
      type: String,
      required: true
    },

    signInSuccessWithAuthResult: {
      type: Function,
      default: null
    },

    uiShown: {
      type: Function,
      default: null
    },

    signInFailure: {
      type: Function,
      default: null
    }
  }
};
</script>
