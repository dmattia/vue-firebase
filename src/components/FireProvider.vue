<template>
  <div>
    <slot v-if="firebase"></slot>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Allows the creation of uniquely named firebase apps
// when there are multiple FireProviders.
let firebaseInstanceId = 0;

/**
 * Provides the firebase client to child components. This
 * should be at the root of your component tree to use other
 * components from this library.
 */
export default {
  name: "FireProvider",

  provide() {
    return {
      firebase: this.firebase,
      firebaseApp: this.firebase.initializeApp(this.config, this.name)
    };
  },

  data() {
    return {
      firebase: firebase
    };
  },

  /*
  created() {
    // TODO(dmattia): Add the name of the app as a param
    console.log(`I am initializing the firebase app ${this.name}`);
    this.app = firebase.initializeApp(this.config, this.name);
  },
  */

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
     * DatabaseURL from firebase config. Needed for Query and FireObject components.
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
    },

    /**
     * Name for this firebase instance, used if you have multiple FireProviders.
     */
    name: {
      type: String,
      default() {
        if (firebaseInstanceId === 0) {
          firebaseInstanceId++;
          return "[DEFAULT]";
        }

        return `[FIREBASE#${firebaseInstanceId++}]`;
      }
    }
  }
};
</script>
