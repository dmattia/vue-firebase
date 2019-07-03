import { mount, shallowMount } from "@vue/test-utils";

import { fireShallowMount, fireMount } from "./firebase-utils.js";
import * as firebase from "firebase/app";
import MockFirebaseProvider from "./MockFirebaseProvider.vue";
import Vue from "vue";

import Query from "../../src/components/database/Query.vue";

const TestComponent = {
  components: { Query },

  template: `
    <Query path="test" ref="list">
      <template v-slot="{ loading, error, data }">
        <p v-if="loading">Loading...</p>
        <p v-else-if="error">Error: {{ error }}</p>
        <p v-else-if="!data">No data found at path: '/test'</p>
        <p v-else>{{ data }}</p>
      </template>
    </Query>
  `
};

describe("Query.vue", () => {
  test.skip("respects endAt", () => {});
  test.skip("respects startAt", () => {});
  test.skip("respects equalTo", () => {});
  test.skip("respects limitToLast", () => {});
  test.skip("respects orderByChild", () => {});
  test.skip("respects orderByKey", () => {});
  test.skip("respects orderByValue", () => {});
  test.skip("respects shouldListen", () => {});
  test.skip("works with nested queries", () => {});
  test.skip("stops watching old data when path changes", () => {});

  test("loads when no data present", () => {
    const { componentUnderTest } = fireMount(TestComponent);
    expect(componentUnderTest.text()).toMatch("Loading...");
  });

  test("loads when data present", async () => {
    const { componentUnderTest, mockFirebaseData } = fireMount(TestComponent);

    await mockFirebaseData({
      test: "some text"
    });

    expect(componentUnderTest.text()).toMatch("some text");
  });

  test("loads list data from db", async () => {
    const { componentUnderTest, mockFirebaseData } = fireMount(TestComponent);

    await mockFirebaseData({
      test: ["first", "second", "third"]
    });

    expect(componentUnderTest.text())
      .toMatch("[\n  \"first\",\n  \"second\",\n  \"third\"\n]");
  });

  test("watches data changes from db", async () => {
    const { componentUnderTest, mockFirebaseData } = fireMount(TestComponent);

    await mockFirebaseData({ test: "some text" });
    expect(componentUnderTest.text()).toMatch("some text");

    await mockFirebaseData({ test: "some other text" });
    expect(componentUnderTest.text()).toMatch("some other text");
  });

  test("watches data removed from db", async () => {
    const { componentUnderTest, mockFirebaseData, clearDb } = fireMount(TestComponent);
    
    await mockFirebaseData({
      test: "some text"
    });
    await clearDb();

    expect(componentUnderTest.text()).toMatch("No data found at path: '/test'");
  });

  test("respects limitToFirst", async () => {
    const slot = `
      <div>
        <p v-if="props.loading">Loading...</p>
        <p v-else-if="props.error">Error: {{ props.error }}</p>
        <p v-else-if="!props.data">No data found at path: '/test'</p>
        <p v-else>{{ props.data }}</p>
      </div>
    `;

    const wrapper = shallowMount(Query, {
      propsData: {
        path: "test",
        limitToFirst: 3
      },
      parentComponent: MockFirebaseProvider,
      provide: { firebase },
      scopedSlots: {
        default: slot
      }
    });

    wrapper.vm.$parent.updateDb({
      test: ["first", "second", "third", "fourth", "fifth"]
    });

    await wrapper.vm.$nextTick;

    expect(wrapper.text())
      .toMatch("[\n  \"first\",\n  \"second\",\n  \"third\"\n]");

    wrapper.setProps({
      limitToFirst: 2
    });

    expect(wrapper.text())
      .toMatch("[\n  \"first\",\n  \"second\"\n]");
  });
});
