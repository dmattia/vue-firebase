<template>
  <div id="app">
    <input v-model="path" type="text" />

    <FireProvider :config="firebaseConfig">
      <FireQuery :path="path" :shouldListen="false">
        <template v-slot:error="{ errorMsg }">
          Error: {{ errorMsg }}
        </template>

        <template v-slot:loading>
          Loading...
        </template>

        <template v-slot:success="{ data }">
          {{ data }}
        </template>

        <template v-slot:no-data>
          No data found at path: {{ path }}
        </template>
      </FireQuery>
    </FireProvider>
  </div>
</template>

<script>
import FireProvider from "./components/FireProvider.vue";
import FireQuery from "./components/FireQuery.vue";

var firebaseConfig = {
  databaseURL: "https://vue-firebase-8bf0c.firebaseio.com"
};

export default {
  name: "app",
  components: { FireProvider, FireQuery },
  data() {
    return {
      firebaseConfig,
      path: "test"
    };
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
