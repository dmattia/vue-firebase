<template>
  <CustomProvider :providerId="firebase.auth.EmailAuthProvider.PROVIDER_ID">
    <slot></slot>
  </CustomProvider>
</template>

<script>
import CustomProvider from "@/components/auth/firebaseui/providers/AuthProvider.vue";
import firebase from "firebase/app";

export default {
  name: "EmailProvider",

  inject: ["firebase", "setCustomOptions"],

  components: { CustomProvider },

  created() {
    this.setCustomOptions(
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      this.customOptions
    );
  },

  watch: {
    customOptions(newVal, oldVal) {
      if (newVal === oldVal) return;

      this.setCustomOptions(
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        newVal
      );
    }
  },

  computed: {
    customOptions() {
      const options = {
        requireDisplayName: this.requireDisplayName,
        forceSameDevice: this.forceSameDevice
      };

      if (this.signInMethod) options.signInMethod = this.signInMethod;

      return options;
    }
  },

  props: {
    requireDisplayName: {
      type: Boolean,
      default: true
    },

    forceSameDevice: {
      type: Boolean,
      default: false
    },

    signInMethod: {
      type: String,
      default: firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
      validator(val) {
        const options = new Set([
          firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
          firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
        ]);
        return options.has(val);
      }
    }
  }
};
</script>
