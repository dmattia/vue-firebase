import emailComponents from "./email";
import facebookComponents from "./facebook";
import githubComponents from "./github";
import googleComponents from "./google";
import guestComponents from "./guest";
import phoneComponents from "./phone";
import twitterComponents from "./twitter";
import AuthProvider from "./AuthProvider.vue";

const components = {
  ...emailComponents,
  ...facebookComponents,
  ...githubComponents,
  ...googleComponents,
  ...guestComponents,
  ...phoneComponents,
  ...twitterComponents,
  AuthProvider
};

export default components;
