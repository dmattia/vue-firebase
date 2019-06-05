<template>
  <div>
    <slot :user="user"></slot>
  </div>
</template>

<script>
export default {
  name: "FireAuth",

  inject: ["firebase"],

  data() {
    return {
      user: null,
      unsubscribe: undefined
    };
  },

  created() {
    this.unsubscribe = this.firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  },

  beforeDestroy() {
    if (this.unsubscribe !== undefined) {
      this.unsubscribe();
    }
  },

  provide() {
    return {
      isLoggedIn: !!this.user,
      user: this.user
    };
  }
};
</script>
