The `PhoneProvider` can take optional child components, as described at TODO(dmattia): Enter link

```vue
<FireProvider
  :authDomain="`vue-firebase-8bf0c.firebaseapp.com`"
  :apiKey="`AIzaSyB_JLBsyGUznYqg9uzhzTTwNbF8LvPsWGU`"
>
  <AuthUi
    tosUrl="/tos"
    privacyPolicyUrl="/privacy"
    signInFlow="popup"
  >
    <PhoneProvider defaultCountry="+1" defaultNationalNumber="1234567890">
      <Recaptcha type="audio" size="invisible" badge="inline" />
      <WhitelistedCountry id="+1" />
      <WhitelistedCountry id="+44" />
    </PhoneProvider>
  </AuthUI>
</FireProvider>
```
