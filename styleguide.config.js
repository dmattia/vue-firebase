module.exports = {
  title: "Default Style Guide",
  defaultExample: false,
  pagePerSection: true,
  sections: [
    {
      name: "Getting Started",
      contents: "docs/GettingStarted.md",
      description: "Some Text about Getting Started",
      components: "src/components/FireProvider.vue"
    },
    {
      name: "Database",
      components: "src/components/database/**/[A-Z]*.vue"
    },
    {
      name: "Auth",
      description:
        "See `FirebaseUi` for login components, or `UserWatcher` for watching auth state.",
      pagePerSection: true,
      sectionDepth: 1,
      sections: [
        {
          name: "FirebaseUi",
          description: "FirebaseUi controls the login/signup ui for your app.",
          components: "src/components/auth/firebaseui/AuthUi.vue",
          pagePerSection: true,
          sectionDepth: 1,
          sections: [
            {
              name: "Permissions/Scopes",
              components: "src/components/auth/firebaseui/Scope.vue"
            },
            {
              name: "CustomParameters",
              components: "src/components/auth/firebaseui/OAuthParam.vue"
            },
            {
              // TODO(dmattia): Make a separate page for each provider.
              name: "Providers",
              components:
                "src/components/auth/firebaseui/providers/**/[A-Z]*Provider.vue"
            }
          ]
        },
        {
          name: "UserWatcher",
          components: "src/components/auth/FireAuth.vue"
        }
      ]
    }
  ],
  ribbon: {
    text: "View on Github",
    url: "https://github.com/dmattia/vue-firebase"
  }
};
