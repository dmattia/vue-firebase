<template>
  <div id="phoneProvider"></div>
</template>

<script>
export default {
  name: "PhoneProvider",

  inject: ["firebase", "authConfig"],

  created() {
    this.authConfig.signInOptions.push({
      provider: this.firebase.auth.PhoneAuthProvider.PROVIDER_ID
    });
  }
};
</script>
