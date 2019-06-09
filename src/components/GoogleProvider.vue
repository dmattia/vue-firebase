<template>
  <CustomProvider
    :providerId="this.firebase.auth.GoogleAuthProvider.PROVIDER_ID"
  >
    <slot></slot>
  </CustomProvider>
</template>

<script>
import CustomProvider from "./AuthProvider.vue";

export default {
  name: "GoogleProvider",

  inject: ["firebase"],

  components: { CustomProvider }
};
</script>
