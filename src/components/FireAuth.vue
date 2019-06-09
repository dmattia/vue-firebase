<template>
  <div>
    <slot :user="user" :isLoggedIn="!!user" :loading="loading"></slot>
  </div>
</template>

<script>
export default {
  name: "FireAuth",

  inject: ["firebase"],

  data() {
    return {
      user: null,
      unsubscribe: undefined,
      loading: true
    };
  },

  created() {
    this.unsubscribe = this.firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      this.loading = false;
    });
  },

  beforeDestroy() {
    if (this.unsubscribe !== undefined) {
      this.unsubscribe();
    }
  }
};
</script>
