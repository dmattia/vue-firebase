<template>
  <div id="anonymousProvider"></div>
</template>

<script>
export default {
  name: "AnonymousProvider",

  inject: ["firebase", "authConfig"],

  created() {
    this.authConfig.signInOptions.push({
      provider: this.firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    });
  }
};
</script>
