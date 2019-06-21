import Vue from "vue";

import AnonymousProvider from "./components/AnonymousProvider.vue";
import AuthUi from "./components/AuthUi.vue";
import BlacklistedCountry from "./components/BlacklistedCountry.vue";
import CustomProvider from "./components/AuthProvider.vue";
import EmailProvider from "./components/EmailProvider.vue";
import FacebookProvider from "./components/FacebookProvider.vue";
import FireAuth from "./components/FireAuth.vue";
import FireList from "./components/FireList.vue";
import FireObject from "./components/FireObject.vue";
import FireProvider from "./components/FireProvider.vue";
import GithubProvider from "./components/GithubProvider.vue";
import GoogleProvider from "./components/GoogleProvider.vue";
import OAuthParam from "./components/OAuthParam.vue";
import PhoneProvider from "./components/PhoneProvider.vue";
import Recaptcha from "./components/Recaptcha.vue";
import Scope from "./components/Scope.vue";
import TwitterProvider from "./components/TwitterProvider.vue";
import WhitelistedCountry from "./components/WhitelistedCountry.vue";

const components = {
  AnonymousProvider,
  AuthUi,
  BlacklistedCountry,
  CustomProvider,
  EmailProvider,
  FacebookProvider,
  FireAuth,
  FireList,
  FireObject,
  FireProvider,
  GithubProvider,
  GoogleProvider,
  OAuthParam,
  PhoneProvider,
  Recaptcha,
  Scope,
  TwitterProvider,
  WhitelistedCountry
};

Object.keys(components).forEach(name => {
  Vue.component(name, components[name]);
});

export default components;
