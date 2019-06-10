<template>
  <CustomProvider
    :providerId="this.firebase.auth.FacebookAuthProvider.PROVIDER_ID"
  >
    <slot></slot>
  </CustomProvider>
</template>

<script>
import CustomProvider from "./AuthProvider.vue";

export default {
  name: "FacebookProvider",

  inject: ["firebase"],

  components: { CustomProvider }
};
</script>
