<template>
  <div id="app">
    <FireProvider
      :databaseURL="`https://vue-firebase-8bf0c.firebaseio.com`"
      :authDomain="`vue-firebase-8bf0c.firebaseapp.com`"
      :apiKey="`AIzaSyB_JLBsyGUznYqg9uzhzTTwNbF8LvPsWGU`"
    >
      <FireAuth>
        <template v-slot="{ isLoggedIn, user }">
          <p v-if="isLoggedIn">{{ user }}</p>
          <p v-else>No user is logged in</p>
        </template>
      </FireAuth>
      <input v-model="path" type="text" />

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
import FireAuth from "./components/FireAuth.vue";
import FireProvider from "./components/FireProvider.vue";
import FireList from "./components/FireList.vue";

export default {
  name: "app",
  components: { FireProvider, FireList, FireAuth },
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
