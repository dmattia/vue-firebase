import firebase from "firebase";
import { mount, shallowMount } from "@vue/test-utils";
import Vue from "vue";

import { arrayToObject } from "./utils.js";
import MockFirebaseProvider from "./MockFirebaseProvider.vue";

let server_id = 0;

const createDb = () => {
  const app = firebase.initializeApp({
    databaseURL: `https://fake-test-data-${server_id++}.firebaseio.com`
  });

  return firebase.database(app);
};

const fireMount = (component, options) => {
  return fireMountHelper(component, options, mount);
};

const fireShallowMount = (component, options) => {
  const mountFn = (component, options) => shallowMount(component, {
    ...options,
    stubs: {
      ...arrayToObject(options.stubs),
      TestComponent: false
    }
  });

  return fireMountHelper(component, options, shallowMount);
};

const fireMountHelper = (component, options, mountFn) => {
  const providedForComponent = {
    components: {
      TestComponent: component,
      MockFirebaseProvider
    },

    template: `
      <MockFirebaseProvider ref="provider">
        <TestComponent ref="testComponent" />
      </MockFirebaseProvider>
    `
  };

  const wrapper = mountFn(providedForComponent, options);

  return {
    /**
     * Promises do not resolve for firebase `set` functions when the
     * database is declared offline. Instead of awaiting the promise,
     * we execute it asyncronously and wait just for the next vue tick.
     */
    async mockFirebaseData(jsonObj) {
      wrapper.vm.$refs.provider.updateDb(jsonObj);
      await wrapper.vm.$nextTick;
    },

    async clearDb() {
      wrapper.vm.$refs.provider.clearDb();
      await wrapper.vm.$nextTick;
    },

    componentUnderTest: wrapper.find({
      ref: "testComponent"
    }),

    wrapper: wrapper
  };
};

export {
  createDb,
  fireMount,
  fireShallowMount
};
