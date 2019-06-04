# Vue-Firebase

Declarative Vue.js components for working with Firebase Realtime Database data.

This is an experimental project, and is not production-ready at this time.

## Sample Usage

```html
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
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
