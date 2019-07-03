# AuthUi

Basic example with some providers:

TODO(dmattia): Add `SimpleAuthUi.vue` that looks like: `<SimpleAuthUi config="config" />`

TODO(dmattia): Make use of `SimpleAuthUi` from `AuthUi` to dedup logic

TODO(dmattia): Link to official firebaseui docs

TODO(dmattia): Explain briefly that this can be used for both logins + sign ups.

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
    <GoogleProvider />
    <PhoneProvider />
    <GithubProvider />
    <EmailProvider />
    <FacebookProvider />
    <TwitterProvider />
    <CustomProvider
      providerId="yahoo.com"
      providerName="yahoo"
      buttonColor="#720E9E"
      iconUrl="https://cdn1.iconfinder.com/data/icons/smallicons-logotypes/32/yahoo-512.png"
    />
    <AnonymousProvider />
  </AuthUi>
</FireProvider>
```
