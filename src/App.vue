<template>
  <div id="app">
    <FireProvider
      :databaseURL="`https://vue-firebase-8bf0c.firebaseio.com`"
      :authDomain="`vue-firebase-8bf0c.firebaseapp.com`"
      :apiKey="`AIzaSyB_JLBsyGUznYqg9uzhzTTwNbF8LvPsWGU`"
    >
      <FireAuth>
        <template v-slot="{ isLoggedIn, user, loading }">
          <p v-if="loading">Loading...</p>
          <p v-else-if="isLoggedIn">{{ user.uid }}</p>
          <p v-else>No user is logged in</p>
        </template>
      </FireAuth>

      <AuthUi
        :tosUrl="`http://www.google.com`"
        :privacyPolicyUrl="`http://www.google.com`"
        signInFlow="redirect"
        :signInSuccessWithAuthResult="authResult => false"
      >
        <GoogleProvider v-if="path == 'abc'">
          <Scope :name="`https://www.googleapis.com/auth/contacts.readonly`" />
          <Scope :name="`https://www.googleapis.com/auth/user.birthday.read`" />
          <Scope
            :name="`https://www.googleapis.com/auth/user.phonenumbers.read`"
          />

          <OAuthParam name="prompt" val="consent" />
          <OAuthParam name="login_hint" val="dmattia13@gmail.com" />
        </GoogleProvider>
        <!--
        <PhoneProvider />
        <AnonymousProvider />
        <GithubProvider />
        -->
      </AuthUi>

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
import AuthUi from "./components/AuthUi.vue";
import FireProvider from "./components/FireProvider.vue";
import FireList from "./components/FireList.vue";
import GoogleProvider from "./components/GoogleProvider.vue";
import Scope from "./components/Scope.vue";
import OAuthParam from "./components/OAuthParam.vue";

/*
import GithubProvider from "./components/GithubProvider.vue";
import PhoneProvider from "./components/PhoneProvider.vue";
import AnonymousProvider from "./components/AnonymousProvider.vue";
*/

export default {
  name: "app",
  components: {
    FireProvider,
    FireList,
    FireAuth,
    AuthUi,
    GoogleProvider,
    Scope,
    OAuthParam
    // GithubProvider,
    // PhoneProvider,
    // AnonymousProvider
  },
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
