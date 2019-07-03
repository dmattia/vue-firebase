Setup in App.vue:

TODO(dmattia): Update the docs for having multiple `FireProvider`s.

TODO(dmattia): Add section on `FireProvider` vs `MockFireProvider`

TODO(dmattia): Add example using all props

TODO(dmattia): Add example connecting to local websocket (for use with `firebase-server`)

TODO(dmattia): Add a separate component that looks like `<SimpleFireProvider firebase="firebase" />`

- For `SimpleFireProvider`:
  - Inject `this.firebase.app()` using the default app as `firebaseApp`.
  - Alternate Idea: Don't even require a firebase param. Just import `firebase` and assume the user will call `initializeApp`
  - Have separate documentation explaining why this limits to a single instance (but `FireProvider` can support multiple)

```vue
<FireProvider>
  <p>I have access to firebase and firebaseApp :)</p>
  <p>Any subcomponents in this tree may inject "firebase" or "firebaseApp"</p>
</FireProvider>
```
