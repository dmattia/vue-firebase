<template>
  <div id="authui">
    <slot></slot>
    <div id="firebaseui-auth-container"></div>
    {{ joinedConfig }}
  </div>
</template>

<script>
import * as firebaseui from "firebaseui";
require("firebaseui/dist/firebaseui.css");

export default {
  name: "AuthUi",

  inject: ["firebase"],

  data() {
    return {
      config: this.setInitialConfig(),
      providerDict: {},
      ui: new firebaseui.auth.AuthUI(this.firebase.auth())
    };
  },

  methods: {
    updateProvider(provider, newVal) {
      this.$set(this.providerDict, provider, newVal);
    },

    removeProvider(provider) {
      this.$delete(this.providerDict, provider);
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

      return config;
    }
  },

  computed: {
    joinedConfig() {
      return {
        ...this.config,
        signInOptions: Object.values(this.providerDict)
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
      removeProvider: this.removeProvider
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
    }
  }
};
</script>
