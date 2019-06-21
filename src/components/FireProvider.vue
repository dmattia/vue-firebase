<template>
  <div>
    <slot v-if="firebase"></slot>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

/**
 * Provides the firebase client to child components. This
 * should be at the root of your component tree to use other
 * components from this library.
 */
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
    /**
     * ApiKey from firebase config. Needed for AuthUi components.
     */
    apiKey: {
      type: String,
      required: false,
      default: null
    },
    /**
     * AuthDomain from firebase config. Needed for AuthUi components.
     */
    authDomain: {
      type: String,
      default: null
    },
    /**
     * DatabaseURL from firebase config. Needed for FireList and FireObject components.
     */
    databaseURL: {
      type: String,
      default: null
    },
    /**
     * ProjectId from firebase config.
     */
    projectId: {
      type: String,
      default: null
    },
    /**
     * StorageBucket from firebase config.
     */
    storageBucket: {
      type: String,
      default: null
    },
    /**
     * MessagingSenderId from firebase config. FCM is not a part of this library.
     */
    messagingSenderId: {
      type: String,
      default: null
    },
    /**
     * AppId from firebase config.
     */
    appId: {
      type: String,
      default: null
    }
  }
};
</script>
