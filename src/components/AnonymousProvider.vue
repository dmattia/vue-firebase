<template>
  <CustomProvider :providerId="providerId">
    <slot></slot>
  </CustomProvider>
</template>

<script>
import CustomProvider from "./AuthProvider.vue";
import FirebaseUi from "firebaseui";

/**
 * Adds "Checkout as Guest" option to firebaseui.
 */
export default {
  name: "AnonymousProvider",

  data() {
    return {
      providerId: FirebaseUi.auth.AnonymousAuthProvider.PROVIDER_ID
    };
  },

  components: { CustomProvider }
};
</script>
