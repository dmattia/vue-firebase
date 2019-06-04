<template>
  <div>
    <slot v-if="firebase"></slot>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/database";

export default {
  name: "FireProvider",

  provide() {
    return {
      firebase: this.firebase
    };
  },

  data() {
    return {
      firebase: firebase
    };
  },

  created() {
    firebase.initializeApp(this.config);
  },

  props: {
    config: Object
  }
};
</script>
