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
          <p v-else-if="!isLoggedIn">No user is logged in</p>

          <div v-else>
            <p>{{ user.uid }}</p>
            <button v-on:click="user.delete()">Delete Account</button>
          </div>
        </template>
      </FireAuth>

      <AuthUi
        :tosUrl="`http://www.google.com`"
        :privacyPolicyUrl="`http://www.google.com`"
        signInFlow="popup"
        :signInSuccessWithAuthResult="authResult => false"
      >
        <GoogleProvider>
          <Scope :name="`https://www.googleapis.com/auth/contacts.readonly`" />
          <Scope :name="`https://www.googleapis.com/auth/user.birthday.read`" />
          <Scope
            :name="`https://www.googleapis.com/auth/user.phonenumbers.read`"
          />

          <OAuthParam name="prompt" val="consent" />
          <OAuthParam name="login_hint" val="some@param.com" />
        </GoogleProvider>

        <PhoneProvider defaultCountry="+1" defaultNationalNumber="1234567890">
          <Recaptcha type="audio" size="invisible" badge="inline" />
          <WhitelistedCountry id="+1" />
          <WhitelistedCountry id="+44" />
        </PhoneProvider>

        <EmailProvider :requireDisplayName="true" />
        <GithubProvider />
        <AnonymousProvider />
        <FacebookProvider />
        <TwitterProvider />

        <CustomProvider
          :providerId="`yahoo.com`"
          :providerName="`Yahoo`"
          :buttonColor="`#720E9E`"
          :iconUrl="
            `https://cdn1.iconfinder.com/data/icons/smallicons-logotypes/32/yahoo-512.png`
          "
        />
        <CustomProvider
          :providerId="`microsoft.com`"
          :providerName="`Microsoft`"
          :buttonColor="`#737373`"
          :iconUrl="
            `https://cdn0.iconfinder.com/data/icons/shift-free/32/Microsoft-512.png`
          "
        />
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
import GithubProvider from "./components/GithubProvider.vue";
import PhoneProvider from "./components/PhoneProvider.vue";
import AnonymousProvider from "./components/AnonymousProvider.vue";
import EmailProvider from "./components/EmailProvider.vue";
import TwitterProvider from "./components/TwitterProvider.vue";
import FacebookProvider from "./components/FacebookProvider.vue";
import CustomProvider from "./components/AuthProvider.vue";
import Recaptcha from "./components/Recaptcha.vue";
import WhitelistedCountry from "./components/WhitelistedCountry.vue";

export default {
  name: "app",
  components: {
    FireProvider,
    FireList,
    FireAuth,
    AuthUi,
    GoogleProvider,
    Scope,
    OAuthParam,
    GithubProvider,
    PhoneProvider,
    AnonymousProvider,
    EmailProvider,
    TwitterProvider,
    FacebookProvider,
    CustomProvider,
    Recaptcha,
    WhitelistedCountry
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
