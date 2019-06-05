<template>
  <div id="app">
    <input v-model="path" type="text" />

    <FireProvider :databaseURL="`https://vue-firebase-8bf0c.firebaseio.com`">
      <FireList :path="path">
        <template v-slot="{ loading, error, data }">
          <p v-if="loading">Loading...</p>
          <p v-else-if="error">Error: {{ error }}</p>
          <p v-else-if="data">{{ data }}</p>
          <p v-else>No data found at path: '/{{ path }}'</p>
        </template>
      </FireList>
    </FireProvider>
  </div>
</template>

<script>
import FireProvider from "./components/FireProvider.vue";
import FireList from "./components/FireList.vue";

export default {
  name: "app",
  components: { FireProvider, FireList },
  data() {
    return {
      path: ""
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
