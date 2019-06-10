<template>
  <CustomProvider
    :providerId="this.firebase.auth.PhoneAuthProvider.PROVIDER_ID"
  >
    <slot></slot>
  </CustomProvider>
</template>

<script>
import CustomProvider from "./AuthProvider.vue";

export default {
  name: "PhoneProvider",

  inject: ["firebase", "setCustomOptions"],

  provide() {
    return {
      setCaptcha: this.setCaptcha,

      addWhitelistedCountry: this.addWhitelistedCountry,
      removeWhitelistedCountry: this.removeWhitelistedCountry,

      addBlacklistedCountry: this.addBlacklistedCountry,
      removeBlacklistedCountry: this.removeBlacklistedCountry
    };
  },

  methods: {
    setCaptcha(captcha) {
      this.captchaParams = captcha;
    },

    addWhitelistedCountry(country) {
      this.$set(this.whitelistedCountries, country, true);
    },

    addBlacklistedCountry(country) {
      this.$set(this.blacklistedCountries, country, true);
    },

    removeWhitelistedCountry(country) {
      this.$delete(this.whitelistedCountries, country);
    },

    removeBlacklistedCountry(country) {
      this.$delete(this.blacklistedCountries, country);
    }
  },

  components: { CustomProvider },

  data() {
    return {
      whitelistedCountries: {},
      blacklistedCountries: {},
      captchaParams: {}
    };
  },

  created() {
    this.setCustomOptions(
      this.firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      this.customOptions
    );
  },

  watch: {
    customOptions(newVal, oldVal) {
      if (newVal === oldVal) return;

      this.setCustomOptions(
        this.firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        newVal
      );
    }
  },

  computed: {
    supportedCountries() {
      const whitelist = Object.keys(this.whitelistedCountries);
      const blacklist = Object.keys(this.blacklistedCountries);

      if (whitelist.length && blacklist.length) {
        console.error(
          "Either whitelist or blacklist should be populated, but not both"
        );
      }

      if (whitelist.length) {
        return { whitelistedCountries: whitelist };
      }

      if (blacklist.length) {
        return { blacklistedCountries: blacklist };
      }

      return {};
    },

    customOptions() {
      const options = {
        ...this.supportedCountries
      };

      if (this.defaultCountry) options.defaultCountry = this.defaultCountry;
      if (this.loginHint) options.loginHint = this.loginHint;

      if (this.defaultNationalNumber) {
        options.defaultNationalNumber = this.defaultNationalNumber;
      }

      if (Object.keys(this.captchaParams).length) {
        options.recaptchaParameters = this.captchaParams;
      }

      return options;
    }
  },

  props: {
    defaultCountry: {
      type: String,
      default: null
    },

    defaultNationalNumber: {
      type: String,
      default: null
    },

    loginHint: {
      type: String,
      default: null
    }
  }
};
</script>
