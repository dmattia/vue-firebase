<template>
  <CustomProvider
    :providerId="this.firebase.auth.TwitterAuthProvider.PROVIDER_ID"
  >
    <slot></slot>
  </CustomProvider>
</template>

<script>
import CustomProvider from "./AuthProvider.vue";

export default {
  name: "TwitterProvider",

  inject: ["firebase"],

  components: { CustomProvider }
};
</script>
