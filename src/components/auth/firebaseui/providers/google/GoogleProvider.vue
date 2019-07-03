<template>
  <CustomProvider
    :providerId="this.firebase.auth.GoogleAuthProvider.PROVIDER_ID"
  >
    <slot></slot>
  </CustomProvider>
</template>

<script>
import CustomProvider from "@/components/auth/firebaseui/providers/AuthProvider.vue";

export default {
  name: "GoogleProvider",

  inject: ["firebase"],

  components: { CustomProvider }
};
</script>
