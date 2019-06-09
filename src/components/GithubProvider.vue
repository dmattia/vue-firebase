<template>
  <div id="githubProvider"></div>
</template>

<script>
export default {
  name: "GithubProvider",

  inject: ["firebase", "authConfig"],

  created() {
    this.authConfig.signInOptions.push({
      provider: this.firebase.auth.GithubAuthProvider.PROVIDER_ID
    });
  }
};
</script>
