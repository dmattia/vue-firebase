<template>
  <div>
    <slot v-if="firebase"></slot>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

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

  computed: {
    config() {
      const config = {};

      if (this.apiKey) {
        config.apiKey = this.apiKey;
      }

      if (this.authDomain) {
        config.authDomain = this.authDomain;
      }

      if (this.databaseURL) {
        config.databaseURL = this.databaseURL;
      }

      if (this.projectId) {
        config.projectId = this.projectId;
      }

      if (this.storageBucket) {
        config.storageBucket = this.storageBucket;
      }

      if (this.messagingSenderId) {
        config.messagingSenderId = this.messagingSenderId;
      }

      if (this.appId) {
        config.appId = this.appId;
      }

      return config;
    }
  },

  props: {
    apiKey: String,
    authDomain: String,
    databaseURL: String,
    projectId: String,
    storageBucket: String,
    messagingSenderId: String,
    appId: String
  }
};
</script>
