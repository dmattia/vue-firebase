<template>
  <CustomProvider
    :providerId="this.firebase.auth.GithubAuthProvider.PROVIDER_ID"
  >
    <slot></slot>
  </CustomProvider>
</template>

<script>
import CustomProvider from "@/components/auth/firebaseui/providers/AuthProvider.vue";

export default {
  name: "GithubProvider",

  inject: ["firebase"],

  components: { CustomProvider }
};
</script>
