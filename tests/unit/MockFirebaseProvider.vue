<template>
  <div class="mock-provider">
   <slot></slot>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/database";

const app = firebase.initializeApp({
  databaseURL: `https://fake-test-data.firebaseio.com`
});
const firebaseDb = firebase.database(app);
firebaseDb.goOffline();

export default {
  name: "MockFirebaseProvider",

  provide() {
    return { firebase };
  },

  methods: {
    /**
     * Removes all data from the db.
     */
    clearDb() {
      return firebaseDb.ref().remove();
    },

    /**
     * Another way to change the fake data in the root firebase reference.
     * Calling this function is equivalent to changing the `mockData` prop.
     * @public
     */
    updateDb(mockData) {
      if (!mockData || Object.keys(mockData).length === 0) {
        return this.clearDb();
      }

      return firebaseDb.ref().set(mockData);
    }
  },

  watch: {
    mockData: {
      handler(newVal) {
        this.updateDb(newVal);
      },
      immediate: true,
      deep: true
    }
  },

  props: {
    /**
     * Object that will be set at the root reference of the fake firebase app.
     * Setting to a falsey value or to an object with no keys will clear the db.
     */
    mockData: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
