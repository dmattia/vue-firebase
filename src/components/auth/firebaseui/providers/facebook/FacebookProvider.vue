<template>
  <CustomProvider
    :providerId="this.firebase.auth.FacebookAuthProvider.PROVIDER_ID"
  >
    <slot></slot>
  </CustomProvider>
</template>

<script>
import CustomProvider from "@/components/auth/firebaseui/providers/AuthProvider.vue";

export default {
  name: "FacebookProvider",

  inject: ["firebase"],

  components: { CustomProvider }
};
</script>
